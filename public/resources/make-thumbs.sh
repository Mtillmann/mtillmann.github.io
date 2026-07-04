#!/bin/bash

FOLDER="$1"

if [ -z "$FOLDER" ]; then
  echo "Usage: $0 /path/to/folder"
  exit 1
fi

shopt -s nullglob nocaseglob
FILES=("$FOLDER"/*.jpg "$FOLDER"/*.jpeg "$FOLDER"/*.png)

if [ ${#FILES[@]} -eq 0 ]; then
  echo "No image files found in $FOLDER"
  exit 1
fi

for f in "${FILES[@]}"; do
  [[ "$f" == *-tn.* ]] && continue
  base=$(basename "${f%.*}")
  ext="${f##*.}"
  OUT="$FOLDER/${base}-tn.${ext}"
  echo "Processing: $f -> $OUT"
  exiftool -GPS:All= -overwrite_original "$f"
  magick "$f" -thumbnail 512x512^ -gravity Center -extent 512x512 "$OUT"
  exiftool -GPS:All= -overwrite_original "$OUT"
done

echo "Done."
