export type EmojiRenderMode = 'single' | 'random' | 'perLetter';

export type LetterEmojiMap = Record<string, string>;

export type EmojiChoice = {
  label: string;
  value: string;
};

export type EmojiTextCharacter = {
  source: string;
  normalized: string;
  emoji: string;
};

export type EmojiTextResult = {
  rows: string[];
  plainOutput: string;
  characters: EmojiTextCharacter[];
  usedEmojis: string[];
};

export type EmojiTextRenderOptions = {
  mode: EmojiRenderMode;
  selectedEmoji: string;
  randomSeed: number;
  emojiCatalog: EmojiChoice[];
  perLetterEmojis: LetterEmojiMap;
};
