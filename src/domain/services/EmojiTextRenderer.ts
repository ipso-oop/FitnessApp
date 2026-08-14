import {
  EmojiTextCharacter,
  EmojiTextRenderOptions,
  EmojiTextResult,
  LetterEmojiMap,
} from '../entities/EmojiText';
import { getPatternForCharacter, isEditableEmojiCharacter } from '../valueObjects/letterPatterns';

const EMPTY_CELL = '  ';

export const normalizeInputCharacter = (character: string): string => {
  // Strip accents so "ä" can use the same pattern as "a".
  return character.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
};

export const getEditableCharacters = (input: string): string[] => {
  const uniqueCharacters = new Set<string>();

  Array.from(input).forEach((character) => {
    const normalized = normalizeInputCharacter(character);

    if (isEditableEmojiCharacter(normalized)) {
      uniqueCharacters.add(normalized);
    }
  });

  return Array.from(uniqueCharacters).sort((first, second) => first.localeCompare(second));
};

export const createDefaultLetterEmojiMap = (
  input: string,
  catalog: readonly { value: string }[],
): LetterEmojiMap => {
  const availableEmojis = catalog.map((emoji) => emoji.value);

  return getEditableCharacters(input).reduce<LetterEmojiMap>((emojiMap, character, index) => {
    emojiMap[character] = availableEmojis[index % availableEmojis.length];
    return emojiMap;
  }, {});
};

export const renderEmojiText = (
  input: string,
  options: EmojiTextRenderOptions,
): EmojiTextResult => {
  const characters = Array.from(input).map((character, index) =>
    createEmojiTextCharacter(character, index, options),
  );

  const rows = buildRows(characters);
  const usedEmojis = Array.from(new Set(characters.map((character) => character.emoji)));

  return {
    rows,
    plainOutput: rows.join('\n'),
    characters,
    usedEmojis,
  };
};

const createEmojiTextCharacter = (
  source: string,
  index: number,
  options: EmojiTextRenderOptions,
): EmojiTextCharacter => {
  const normalized = normalizeInputCharacter(source);

  return {
    source,
    normalized,
    emoji: resolveEmoji(normalized, index, options),
  };
};

const resolveEmoji = (
  character: string,
  index: number,
  options: EmojiTextRenderOptions,
): string => {
  if (options.mode === 'single') {
    return options.selectedEmoji;
  }

  if (options.mode === 'perLetter') {
    return options.perLetterEmojis[character] ?? options.selectedEmoji;
  }

  return pickStableRandomEmoji(character, index, options.randomSeed, options.emojiCatalog);
};

const pickStableRandomEmoji = (
  character: string,
  index: number,
  randomSeed: number,
  catalog: EmojiTextRenderOptions['emojiCatalog'],
): string => {
  const hash = Array.from(character).reduce(
    (currentHash, char) => currentHash + char.charCodeAt(0),
    randomSeed + index * 37,
  );

  return catalog[Math.abs(hash) % catalog.length].value;
};

const buildRows = (characters: EmojiTextCharacter[]): string[] => {
  const rowCount = getPatternForCharacter('A').length;

  return Array.from({ length: rowCount }, (_, rowIndex) =>
    characters.map((character) => renderPatternRow(character, rowIndex)).join(' '),
  );
};

const renderPatternRow = (character: EmojiTextCharacter, rowIndex: number): string => {
  const pattern = getPatternForCharacter(character.normalized);

  return Array.from(pattern[rowIndex])
    .map((cell) => (cell === '#' ? character.emoji : EMPTY_CELL))
    .join('');
};
