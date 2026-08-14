import type { ConverterSettings } from '../entities/converterSettings';
import { withLetterMappings } from '../entities/converterSettings';
import type { Emoji } from '../entities/emoji';
import type { LetterMappings } from '../entities/converterSettings';
import { MAPPABLE_KEYS } from '../entities/letterKey';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';
import type { RandomSource } from '../services/RandomSource';

export class RandomizeLetterMappingsUseCase {
  constructor(
    private readonly catalog: EmojiCatalogRepository,
    private readonly randomSource: RandomSource,
  ) {}

  execute(settings: ConverterSettings): ConverterSettings {
    const emojis = this.catalog.getAll();
    if (emojis.length === 0) {
      throw new Error('Emoji catalog must not be empty.');
    }

    const letterMappings: LetterMappings = new Map(
      MAPPABLE_KEYS.map((key) => [key, this.pick(emojis)]),
    );

    return withLetterMappings(settings, letterMappings);
  }

  private pick(emojis: readonly Emoji[]): Emoji {
    return emojis[this.randomSource.nextInt(emojis.length)];
  }
}
