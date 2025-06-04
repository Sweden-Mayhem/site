#!/bin/sh
deno run --allow-read=template --allow-read=content --allow-read=output --allow-write=output index.ts generate
