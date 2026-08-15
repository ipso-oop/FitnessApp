import type { Emoji } from './emoji';
import type { LetterPattern } from './letterPattern';
import type { MappableKey } from './letterKey';

export const GlyphKinds = {
  Letter: 'letter',
  Space: 'space',
  Newline: 'newline',
  Passthrough: 'passthrough',
} as const;

export type GlyphKind = (typeof GlyphKinds)[keyof typeof GlyphKinds];

export type Pixel = Readonly<{
  row: number;
  column: number;
  filled: boolean;
  emoji: Emoji | null;
}>;

export type Glyph = Readonly<{
  index: number;
  source: string;
  kind: GlyphKind;
  mappableKey: MappableKey | null;
  pattern: LetterPattern | null;
  pixels: readonly (readonly Pixel[])[];
}>;

export const EMPTY_CELL = '  ';
export const LETTER_GAP = ' ';

export function paintPattern(
  pattern: LetterPattern,
  resolveInk: (filledIndex: number) => Emoji,
): readonly (readonly Pixel[])[] {
  let filledIndex = 0;

  return pattern.cells.map((row, rowIndex) =>
    row.map((filled, column) => {
      const emoji = filled ? resolveInk(filledIndex) : null;
      if (filled) {
        filledIndex += 1;
      }

      return Object.freeze({
        row: rowIndex,
        column,
        filled,
        emoji,
      });
    }),
  );
}

export function renderGlyphRow(glyph: Glyph, row: number): string {
  const pixels = glyph.pixels[row];
  if (!pixels) {
    return '';
  }

  return pixels
    .map((pixel) => (pixel.filled && pixel.emoji ? pixel.emoji.glyph : EMPTY_CELL))
    .join('');
}
