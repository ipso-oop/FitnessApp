import type { ConverterSettings } from '../entities/converterSettings';
import { withGlobalEmoji } from '../entities/converterSettings';
import type { Emoji } from '../entities/emoji';

export class SetGlobalEmojiUseCase {
  execute(settings: ConverterSettings, emoji: Emoji): ConverterSettings {
    return withGlobalEmoji(settings, emoji);
  }
}
