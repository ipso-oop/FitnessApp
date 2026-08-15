import { createEmoji, EmojiCategories, type Emoji } from '../entities/emoji';
import type { LetterMappings } from '../entities/converterSettings';
import { parseLetterPattern } from '../entities/letterPattern';
import { MAPPABLE_KEYS, type MappableKey } from '../entities/letterKey';
import type { ConverterSettings } from '../entities/converterSettings';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';
import type { LetterFontRepository } from '../repositories/LetterFontRepository';

export function fakeEmoji(id: string, glyph = '⭐'): Emoji {
  return createEmoji(id, glyph, id, EmojiCategories.Symbols);
}

export function createTestCatalog(
  emojis: readonly Emoji[] = [
    fakeEmoji('star', '⭐'),
    fakeEmoji('heart', '❤️'),
    fakeEmoji('fire', '🔥'),
  ],
): EmojiCatalogRepository {
  const byId = new Map(emojis.map((emoji) => [emoji.id, emoji]));

  return {
    getAll: () => emojis,
    getById: (id) => byId.get(id),
    getByCategory: (category) =>
      emojis.filter((emoji) => emoji.category === category),
    getDefaultMappings: () =>
      new Map(MAPPABLE_KEYS.map((key, index) => [key, emojis[index % emojis.length]])),
    getDefaultGlobalEmoji: () => emojis[0],
    search: (query) =>
      emojis.filter((emoji) => emoji.label.includes(query) || emoji.id.includes(query)),
  };
}

export function createTestSettings(
  catalog: EmojiCatalogRepository,
  overrides: Partial<ConverterSettings> = {},
): ConverterSettings {
  return {
    mode: 'perLetter',
    letterMappings: catalog.getDefaultMappings(),
    globalEmoji: catalog.getDefaultGlobalEmoji(),
    ...overrides,
  };
}

export function mappingFor(
  catalog: EmojiCatalogRepository,
  assignments: Partial<Record<MappableKey, string>>,
): LetterMappings {
  const mappings = new Map(catalog.getDefaultMappings());
  for (const [key, emojiId] of Object.entries(assignments) as Array<
    [MappableKey, string]
  >) {
    const emoji = catalog.getById(emojiId);
    if (emoji) {
      mappings.set(key, emoji);
    }
  }
  return mappings;
}

export const TEST_LETTER_PATTERN = parseLetterPattern(['X.', '.X']);
export const TEST_SPACE_PATTERN = parseLetterPattern(['..', '..']);

export function createTestFont(): LetterFontRepository {
  return {
    getPattern: () => TEST_LETTER_PATTERN,
    getSpacePattern: () => TEST_SPACE_PATTERN,
    findPattern: (character) => {
      if (character === '!') {
        return parseLetterPattern(['X.', 'X.']);
      }
      return null;
    },
  };
}
