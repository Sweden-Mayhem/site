#!/bin/sh
# Post a Dark Ages news update and publish it.
# Usage: ./darkages-news.sh "Title" "Body text (one or more paragraphs)" [image-file ...]
#
# Creates content/darkages/news/<timestamp>.md and pushes it. GitHub rebuilds the
# site, so the post appears on swedenmayhem.se/darkages/news/.
#
# Any image files listed after the body are copied into template/darkages/images/
# and committed TOGETHER with the post, in ONE commit. Reference them in the body as
# ![alt](/darkages/images/<basename>). NEVER commit a post and its art in separate
# pushes: the post goes live on the first push and shows broken images until the
# second one lands (and a failed second push orphans them for good). One post, one
# push, art included.
set -e
[ -z "$1" ] && { echo "usage: $0 \"Title\" \"Body\" [image-file ...]"; exit 1; }
cd "$(dirname "$0")"

title=$1
body=${2:-}
[ "$#" -ge 2 ] && shift 2 || shift "$#"   # whatever remains in "$@" is image files

ts=$(date +%Y-%m-%d-%H%M%S)
f="content/darkages/news/$ts.md"
printf '# %s\n\n%s\n' "$title" "$body" > "$f"
git add "$f"

# Copy and stage every supplied image into the same commit as the post.
for img in "$@"; do
  [ -f "$img" ] || { echo "image not found: $img"; exit 1; }
  dest="template/darkages/images/$(basename "$img")"
  cp "$img" "$dest"
  git add "$dest"
done

# Refuse to publish if the body references art that is not present (neither passed as
# an arg now nor already committed). This is the guard against the broken-image bug:
# a post can never go live pointing at a /darkages/images/ file that does not exist.
missing=$(grep -o '/darkages/images/[^)" ]*' "$f" | sort -u | while read -r ref; do
  [ -f "template${ref}" ] || echo "  $ref"
done)
if [ -n "$missing" ]; then
  echo "post references images that are not present (pass each as an extra argument):"
  echo "$missing"
  exit 1
fi

git -c user.name="Robin C." -c user.email="hezkore@gmail.com" commit -q -m "darkages: news - $title"
# This repo is shared (hytale / minecraft agents push to it too). Rebase onto
# the latest remote before pushing, and retry, so we never clobber or get rejected.
n=0
until git pull --rebase --autostash -q && git push -q; do
  n=$((n + 1)); [ "$n" -ge 4 ] && { echo "push failed after retries"; exit 1; }
  sleep 3
done
echo "published: $f"
