#!/bin/sh
# Publish the Dark Ages "what works" status page (content/darkages/status.md).
# Edit that file first (move items between Working / Being worked on / Not yet),
# then run this to commit and push. GitHub rebuilds swedenmayhem.se/darkages/status.
# Usage: ./darkages-status.sh ["short note"]
set -e
cd "$(dirname "$0")"
git add content/darkages/status.md
git -c user.name="Robin C." -c user.email="hezkore@gmail.com" commit -q -m "darkages: status update${1:+ - $1}"
git push -q
echo "published status page${1:+ - $1}"
