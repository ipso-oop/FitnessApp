import type { ConversionMode } from './conversionMode';
import type { Glyph } from './glyph';
import { GlyphKinds, LETTER_GAP, renderGlyphRow } from './glyph';

export type ConversionResult = Readonly<{
  sourceText: string;
  glyphs: readonly Glyph[];
  lines: readonly (readonly Glyph[])[];
  mode: ConversionMode;
}>;

export function groupGlyphsIntoLines(
  glyphs: readonly Glyph[],
): readonly (readonly Glyph[])[] {
  const lines: Glyph[][] = [[]];

  for (const glyph of glyphs) {
    if (glyph.kind === GlyphKinds.Newline) {
      lines.push([]);
      continue;
    }

    lines[lines.length - 1].push(glyph);
  }

  return lines.filter((line, index) => line.length > 0 || index === 0);
}

export function toOutputString(result: ConversionResult): string {
  return result.lines
    .map((line) => renderLine(line))
    .join('\n\n');
}

function renderLine(glyphs: readonly Glyph[]): string {
  if (glyphs.length === 0) {
    return '';
  }

  const height = Math.max(...glyphs.map((glyph) => glyph.pixels.length), 0);
  const rows: string[] = [];

  for (let row = 0; row < height; row += 1) {
    rows.push(glyphs.map((glyph) => renderGlyphRow(glyph, row)).join(LETTER_GAP));
  }

  return rows.join('\n');
}
