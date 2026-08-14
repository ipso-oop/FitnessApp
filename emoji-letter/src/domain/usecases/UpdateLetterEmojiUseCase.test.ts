import { UpdateLetterEmojiUseCase } from './UpdateLetterEmojiUseCase';
import { createTestCatalog, createTestSettings } from '../test/fixtures';

describe('UpdateLetterEmojiUseCase', () => {
  it('replaces the emoji for one letter without mutating the original settings', () => {
    const catalog = createTestCatalog();
    const settings = createTestSettings(catalog);
    const next = new UpdateLetterEmojiUseCase().execute(
      settings,
      'a',
      catalog.getById('fire')!,
    );

    expect(next.letterMappings.get('a')?.id).toBe('fire');
    expect(settings.letterMappings.get('a')?.id).not.toBe('fire');
    expect(next).not.toBe(settings);
  });
});
