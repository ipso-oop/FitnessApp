import type { ConverterSettings } from '../../domain/entities/converterSettings';
import type { ConverterSettingsRepository } from '../../domain/repositories/ConverterSettingsRepository';
import type { EmojiCatalogRepository } from '../../domain/repositories/EmojiCatalogRepository';

export class MemoryConverterSettingsRepository
  implements ConverterSettingsRepository
{
  private settings: ConverterSettings;

  constructor(private readonly catalog: EmojiCatalogRepository) {
    this.settings = this.createDefaults();
  }

  async load(): Promise<ConverterSettings> {
    return this.settings;
  }

  async save(settings: ConverterSettings): Promise<void> {
    this.settings = settings;
  }

  resetToDefaults(): ConverterSettings {
    this.settings = this.createDefaults();
    return this.settings;
  }

  private createDefaults(): ConverterSettings {
    return {
      mode: 'perLetter',
      letterMappings: this.catalog.getDefaultMappings(),
      globalEmoji: this.catalog.getDefaultGlobalEmoji(),
    };
  }
}
