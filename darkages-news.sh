#!/bin/sh
# Post a Dark Ages news update and publish it.
# Usage: ./darkages-news.sh "Title" "Body text (one or more paragraphs)"
# Creates content/darkages/news/<timestamp>.md, commits, and pushes. GitHub
# rebuilds the site, so the post appears on swedenmayhem.se/darkages/news/.
set -e
[ -z "$1" ] && { echo "usage: $0 \"Title\" \"Body\""; exit 1; }
cd "$(dirname "$0")"
ts=$(date +%Y-%m-%d-%H%M%S)
f="content/darkages/news/$ts.md"
printf '# %s\n\n%s\n' "$1" "$2" > "$f"
git add "$f"
git -c user.name="Robin C." -c user.email="hezkore@gmail.com" commit -q -m "darkages: news - $1"
# This repo is shared (hytale / minecraft agents push to it too). Rebase onto
# the latest remote before pushing, and retry, so we never clobber or get rejected.
n=0
until git pull --rebase --autostash -q && git push -q; do
  n=$((n + 1)); [ "$n" -ge 4 ] && { echo "push failed after retries"; exit 1; }
  sleep 3
done
echo "published: $f"
