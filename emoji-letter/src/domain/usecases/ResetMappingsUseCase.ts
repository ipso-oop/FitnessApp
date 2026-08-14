import type { ConverterSettings } from '../entities/converterSettings';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';

export class ResetMappingsUseCase {
  constructor(private readonly catalog: EmojiCatalogRepository) {}

  execute(settings: ConverterSettings): ConverterSettings {
    return {
      ...settings,
      letterMappings: this.catalog.getDefaultMappings(),
      globalEmoji: this.catalog.getDefaultGlobalEmoji(),
    };
  }
}
