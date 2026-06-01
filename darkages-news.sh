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
git push -q
echo "published: $f"
