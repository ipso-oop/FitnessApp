import type { ConverterSettings } from '../entities/converterSettings';
import type { ConversionResult } from '../entities/conversionResult';
import { ConversionModes } from '../entities/conversionMode';
import type { Emoji } from '../entities/emoji';
import type { Glyph } from '../entities/glyph';
import { GlyphKinds } from '../entities/glyph';
import { toMappableKey } from '../entities/letterKey';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';
import type { RandomSource } from '../services/RandomSource';

export class ConvertTextToEmojisUseCase {
  constructor(
    private readonly catalog: EmojiCatalogRepository,
    private readonly randomSource: RandomSource,
  ) {}

  execute(text: string, settings: ConverterSettings): ConversionResult {
    const glyphs = Array.from(text).map((character, index) =>
      this.toGlyph(character, index, settings),
    );

    return {
      sourceText: text,
      glyphs,
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
        display: '\n',
        kind: GlyphKinds.Newline,
        mappableKey: null,
        emoji: null,
      };
    }

    if (/\s/u.test(character)) {
      return {
        index,
        source: character,
        display: ' ',
        kind: GlyphKinds.Space,
        mappableKey: null,
        emoji: null,
      };
    }

    const mappableKey = toMappableKey(character);
    if (!mappableKey) {
      return {
        index,
        source: character,
        display: character,
        kind: GlyphKinds.Passthrough,
        mappableKey: null,
        emoji: null,
      };
    }

    const emoji = this.resolveEmoji(mappableKey, settings);
    return {
      index,
      source: character,
      display: emoji.glyph,
      kind: GlyphKinds.Emoji,
      mappableKey,
      emoji,
    };
  }

  private resolveEmoji(
    key: NonNullable<ReturnType<typeof toMappableKey>>,
    settings: ConverterSettings,
  ): Emoji {
    if (settings.mode === ConversionModes.Global) {
      return settings.globalEmoji;
    }

    if (settings.mode === ConversionModes.Random) {
      return this.pickRandomEmoji();
    }

    return settings.letterMappings.get(key) ?? settings.globalEmoji;
  }

  private pickRandomEmoji(): Emoji {
    const catalog = this.catalog.getAll();
    if (catalog.length === 0) {
      throw new Error('Emoji catalog must not be empty.');
    }

    return catalog[this.randomSource.nextInt(catalog.length)];
  }
}
