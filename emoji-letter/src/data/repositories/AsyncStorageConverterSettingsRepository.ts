import AsyncStorage from '@react-native-async-storage/async-storage';

import { isConversionMode } from '../../domain/entities/conversionMode';
import type { ConverterSettings } from '../../domain/entities/converterSettings';
import { isMappableKey } from '../../domain/entities/letterKey';
import type { ConverterSettingsRepository } from '../../domain/repositories/ConverterSettingsRepository';
import type { EmojiCatalogRepository } from '../../domain/repositories/EmojiCatalogRepository';

const STORAGE_KEY = 'emoji-letter.settings.v1';

type SettingsDto = {
  mode: string;
  globalEmojiId: string;
  letterEmojiIds: Record<string, string>;
};

export class AsyncStorageConverterSettingsRepository
  implements ConverterSettingsRepository
{
  constructor(private readonly catalog: EmojiCatalogRepository) {}

  async load(): Promise<ConverterSettings> {
    const defaults = this.createDefaults();
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaults;
    }

    try {
      const dto = JSON.parse(raw) as SettingsDto;
      return this.hydrate(dto, defaults);
    } catch {
      return defaults;
    }
  }

  async save(settings: ConverterSettings): Promise<void> {
    const dto: SettingsDto = {
      mode: settings.mode,
      globalEmojiId: settings.globalEmoji.id,
      letterEmojiIds: Object.fromEntries(
        [...settings.letterMappings.entries()].map(([key, emoji]) => [
          key,
          emoji.id,
        ]),
      ),
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dto));
  }

  private hydrate(dto: SettingsDto, defaults: ConverterSettings): ConverterSettings {
    const mode = isConversionMode(dto.mode) ? dto.mode : defaults.mode;
    const globalEmoji =
      this.catalog.getById(dto.globalEmojiId) ?? defaults.globalEmoji;

    const letterMappings = new Map(defaults.letterMappings);
    for (const [rawKey, emojiId] of Object.entries(dto.letterEmojiIds ?? {})) {
      if (!isMappableKey(rawKey)) {
        continue;
      }
      const emoji = this.catalog.getById(emojiId);
      if (emoji) {
        letterMappings.set(rawKey, emoji);
      }
    }

    return { mode, letterMappings, globalEmoji };
  }

  private createDefaults(): ConverterSettings {
    return {
      mode: 'perLetter',
      letterMappings: this.catalog.getDefaultMappings(),
      globalEmoji: this.catalog.getDefaultGlobalEmoji(),
    };
  }
}
