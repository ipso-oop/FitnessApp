export const LETTER_KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'ä',
  'ö',
  'ü',
  'ß',
] as const;

export const DIGIT_KEYS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;

export const MAPPABLE_KEYS = [...LETTER_KEYS, ...DIGIT_KEYS] as const;

export type LetterKey = (typeof LETTER_KEYS)[number];
export type DigitKey = (typeof DIGIT_KEYS)[number];
export type MappableKey = (typeof MAPPABLE_KEYS)[number];

const MAPPABLE_KEY_SET = new Set<string>(MAPPABLE_KEYS);

export function isMappableKey(value: string): value is MappableKey {
  return MAPPABLE_KEY_SET.has(value);
}

export function toMappableKey(character: string): MappableKey | null {
  if (character.length === 0) {
    return null;
  }

  const normalized = character.toLocaleLowerCase('de-DE');
  return isMappableKey(normalized) ? normalized : null;
}
