import type { ConverterSettings } from '../entities/converterSettings';
import {
  groupGlyphsIntoLines,
  type ConversionResult,
} from '../entities/conversionResult';
import { ConversionModes } from '../entities/conversionMode';
import type { Emoji } from '../entities/emoji';
import type { Glyph } from '../entities/glyph';
import { GlyphKinds, paintPattern } from '../entities/glyph';
import type { LetterPattern } from '../entities/letterPattern';
import { toMappableKey } from '../entities/letterKey';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';
import type { LetterFontRepository } from '../repositories/LetterFontRepository';
import type { RandomSource } from '../services/RandomSource';

export class ConvertTextToEmojisUseCase {
  constructor(
    private readonly catalog: EmojiCatalogRepository,
    private readonly randomSource: RandomSource,
    private readonly font: LetterFontRepository,
  ) {}

  execute(text: string, settings: ConverterSettings): ConversionResult {
    const glyphs = Array.from(text).map((character, index) =>
      this.toGlyph(character, index, settings),
    );

    return {
      sourceText: text,
      glyphs,
      lines: groupGlyphsIntoLines(glyphs),
      mode: settings.mode,
    };
  }

  private toGlyph(
    character: string,
    index: number,
    settings: ConverterSettings,
  ): Glyph {
    if (character === '\n') {
      return {
        index,
        source: character,
        kind: GlyphKinds.Newline,
        mappableKey: null,
        pattern: null,
        pixels: [],
      };
    }

    if (/\s/u.test(character)) {
      return this.drawGlyph({
        index,
        source: character,
        kind: GlyphKinds.Space,
        mappableKey: null,
        pattern: this.font.getSpacePattern(),
        settings,
      });
    }

    const mappableKey = toMappableKey(character);
    if (mappableKey) {
      return this.drawGlyph({
        index,
        source: character,
        kind: GlyphKinds.Letter,
        mappableKey,
        pattern: this.font.getPattern(mappableKey),
        settings,
      });
    }

    const punctuation = this.font.findPattern(character);
    if (punctuation) {
      return this.drawGlyph({
        index,
        source: character,
        kind: GlyphKinds.Letter,
        mappableKey: null,
        pattern: punctuation,
        settings,
      });
    }

    return {
      index,
      source: character,
      kind: GlyphKinds.Passthrough,
      mappableKey: null,
      pattern: null,
      pixels: [],
    };
  }

  private drawGlyph(input: {
    index: number;
    source: string;
    kind: Glyph['kind'];
    mappableKey: Glyph['mappableKey'];
    pattern: LetterPattern;
    settings: ConverterSettings;
  }): Glyph {
    const ink = this.resolveInk(input.mappableKey, input.settings);

    return {
      index: input.index,
      source: input.source,
      kind: input.kind,
      mappableKey: input.mappableKey,
      pattern: input.pattern,
      pixels: paintPattern(input.pattern, ink),
    };
  }

  private resolveInk(
    key: Glyph['mappableKey'],
    settings: ConverterSettings,
  ): (filledIndex: number) => Emoji {
    if (settings.mode === ConversionModes.Random) {
      return () => this.pickRandomEmoji();
    }

    if (settings.mode === ConversionModes.Global || !key) {
      return () => settings.globalEmoji;
    }

    const mapped = settings.letterMappings.get(key) ?? settings.globalEmoji;
    return () => mapped;
  }

  private pickRandomEmoji(): Emoji {
    const catalog = this.catalog.getAll();
    if (catalog.length === 0) {
      throw new Error('Emoji catalog must not be empty.');
    }

    return catalog[this.randomSource.nextInt(catalog.length)];
  }
}
