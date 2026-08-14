import type { ConverterSettings } from '../entities/converterSettings';
import { withLetterEmoji } from '../entities/converterSettings';
import type { Emoji } from '../entities/emoji';
import type { MappableKey } from '../entities/letterKey';

export class UpdateLetterEmojiUseCase {
  execute(
    settings: ConverterSettings,
    key: MappableKey,
    emoji: Emoji,
  ): ConverterSettings {
    return withLetterEmoji(settings, key, emoji);
  }
}
