import { EmojiChoice } from '../../domain/entities/EmojiText';

export const DEFAULT_EMOJI_CATALOG: EmojiChoice[] = [
  { label: 'Stern', value: '⭐' },
  { label: 'Herz', value: '❤️' },
  { label: 'Feuer', value: '🔥' },
  { label: 'Blume', value: '🌸' },
  { label: 'Blitz', value: '⚡' },
  { label: 'Rakete', value: '🚀' },
  { label: 'Krone', value: '👑' },
  { label: 'Glitzer', value: '✨' },
  { label: 'Sonne', value: '☀️' },
  { label: 'Mond', value: '🌙' },
  { label: 'Diamant', value: '💎' },
  { label: 'Party', value: '🎉' },
  { label: 'Kleeblatt', value: '🍀' },
  { label: 'Apfel', value: '🍎' },
  { label: 'Katze', value: '🐱' },
  { label: 'Hund', value: '🐶' },
  { label: 'Panda', value: '🐼' },
  { label: 'Welle', value: '🌊' },
  { label: 'Regenbogen', value: '🌈' },
  { label: 'Musik', value: '🎵' },
];

export const DEFAULT_SINGLE_EMOJI = DEFAULT_EMOJI_CATALOG[0].value;
