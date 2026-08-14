export const EmojiCategories = {
  Smileys: 'smileys',
  Animals: 'animals',
  Food: 'food',
  Nature: 'nature',
  Activities: 'activities',
  Objects: 'objects',
  Symbols: 'symbols',
} as const;

export type EmojiCategory =
  (typeof EmojiCategories)[keyof typeof EmojiCategories];

export type Emoji = Readonly<{
  id: string;
  glyph: string;
  label: string;
  category: EmojiCategory;
}>;

export function createEmoji(
  id: string,
  glyph: string,
  label: string,
  category: EmojiCategory,
): Emoji {
  if (!id.trim() || !glyph.trim() || !label.trim()) {
    throw new Error('Emoji requires id, glyph, and label.');
  }

  return Object.freeze({ id, glyph, label, category });
}
