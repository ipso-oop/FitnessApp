import { MAPPABLE_KEYS } from '../entities/letterKey';
import { SequenceRandomSource } from '../../data/services/MathRandomSource';
import { RandomizeLetterMappingsUseCase } from './RandomizeLetterMappingsUseCase';
import { createTestCatalog, createTestSettings } from '../test/fixtures';

describe('RandomizeLetterMappingsUseCase', () => {
  it('assigns an emoji from the catalog to every mappable key', () => {
    const catalog = createTestCatalog();
    const useCase = new RandomizeLetterMappingsUseCase(
      catalog,
      new SequenceRandomSource([0, 1, 2]),
    );

    const next = useCase.execute(createTestSettings(catalog));
    const ids = catalog.getAll().map((emoji) => emoji.id);

    expect(next.letterMappings.size).toBe(MAPPABLE_KEYS.length);
    for (const key of MAPPABLE_KEYS) {
      expect(ids).toContain(next.letterMappings.get(key)?.id);
    }
  });
});
