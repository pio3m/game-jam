#!/bin/sh
set -e

CSS_DIR="$(dirname "$0")"
SRC_DIR="$CSS_DIR/src"
OUT_MIN="$CSS_DIR/styles.min.css"

# Concatenate in deterministic order (variables first)
cat "$SRC_DIR/variables.css" "$SRC_DIR/base.css" "$SRC_DIR/layout.css" "$SRC_DIR/components.css" "$SRC_DIR/utilities.css" > "$CSS_DIR/.bundle.css"

# Minify: remove comments, collapse whitespace/newlines, trim spaces
sed -E 's:/\*[^*]*\*+([^/*][^*]*\*+)*/::g' "$CSS_DIR/.bundle.css" | \
  tr '\n' ' ' | \
  sed -E 's/[[:space:]]+/ /g; s/ ?([:,;{}]) ?/\1/g' | \
  sed -E 's/;}/}/g' > "$OUT_MIN"

rm -f "$CSS_DIR/.bundle.css"
echo "Built $OUT_MIN"

