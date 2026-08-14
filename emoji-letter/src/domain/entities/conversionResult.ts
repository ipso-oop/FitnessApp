import type { ConversionMode } from './conversionMode';
import type { Glyph } from './glyph';
import { glyphsToString } from './glyph';

export type ConversionResult = Readonly<{
  sourceText: string;
  glyphs: readonly Glyph[];
  mode: ConversionMode;
}>;

export function toOutputString(result: ConversionResult): string {
  return glyphsToString(result.glyphs);
}
