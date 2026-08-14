import { MemoryConverterSettingsRepository } from './MemoryConverterSettingsRepository';
import { StaticEmojiCatalogRepository } from './StaticEmojiCatalogRepository';
import { ConversionModes } from '../../domain/entities/conversionMode';
import { MAPPABLE_KEYS } from '../../domain/entities/letterKey';

describe('StaticEmojiCatalogRepository', () => {
  const catalog = new StaticEmojiCatalogRepository();

  it('provides a default mapping for every mappable key', () => {
    const mappings = catalog.getDefaultMappings();
    expect(mappings.size).toBe(MAPPABLE_KEYS.length);
    for (const key of MAPPABLE_KEYS) {
      expect(mappings.get(key)?.glyph).toBeTruthy();
    }
  });

  it('filters emojis by label', () => {
    const results = catalog.search('Katze');
    expect(results.some((emoji) => emoji.id === 'cat')).toBe(true);
  });
});

describe('MemoryConverterSettingsRepository', () => {
  it('persists updated settings in memory', async () => {
    const catalog = new StaticEmojiCatalogRepository();
    const repository = new MemoryConverterSettingsRepository(catalog);
    const loaded = await repository.load();
    const updated = {
      ...loaded,
      mode: ConversionModes.Global,
    };

    await repository.save(updated);
    await expect(repository.load()).resolves.toEqual(updated);
  });
});
