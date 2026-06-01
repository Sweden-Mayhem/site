#!/bin/sh
# Publish the Dark Ages "what works" status page (content/darkages/status.md).
# Edit that file first (move items between Working / Being worked on / Not yet),
# then run this to commit and push. GitHub rebuilds swedenmayhem.se/darkages/status.
# Usage: ./darkages-status.sh ["short note"]
set -e
cd "$(dirname "$0")"
git add content/darkages/status.md
git diff --cached --quiet && { echo "no status changes to publish"; exit 0; }
git -c user.name="Robin C." -c user.email="hezkore@gmail.com" commit -q -m "darkages: status update${1:+ - $1}"
# This repo is shared (hytale / minecraft agents push to it too). Rebase onto
# the latest remote before pushing, and retry, so we never clobber or get rejected.
n=0
until git pull --rebase --autostash -q && git push -q; do
  n=$((n + 1)); [ "$n" -ge 4 ] && { echo "push failed after retries"; exit 1; }
  sleep 3
done
echo "published status page${1:+ - $1}"
