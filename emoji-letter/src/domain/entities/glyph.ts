import type { Emoji } from './emoji';
import type { MappableKey } from './letterKey';

export const GlyphKinds = {
  Emoji: 'emoji',
  Space: 'space',
  Newline: 'newline',
  Passthrough: 'passthrough',
} as const;

export type GlyphKind = (typeof GlyphKinds)[keyof typeof GlyphKinds];

export type Glyph = Readonly<{
  index: number;
  source: string;
  display: string;
  kind: GlyphKind;
  mappableKey: MappableKey | null;
  emoji: Emoji | null;
}>;

export function glyphsToString(glyphs: readonly Glyph[]): string {
  return glyphs.map((glyph) => glyph.display).join('');
}
