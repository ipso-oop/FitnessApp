import type { ConverterSettings } from '../entities/converterSettings';
import { withGlobalEmoji } from '../entities/converterSettings';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';
import type { RandomSource } from '../services/RandomSource';

export class RandomizeGlobalEmojiUseCase {
  constructor(
    private readonly catalog: EmojiCatalogRepository,
    private readonly randomSource: RandomSource,
  ) {}

  execute(settings: ConverterSettings) {
    const emojis = this.catalog.getAll();
    if (emojis.length === 0) {
      throw new Error('Emoji catalog must not be empty.');
    }

    return withGlobalEmoji(
      settings,
      emojis[this.randomSource.nextInt(emojis.length)],
    );
  }
}
