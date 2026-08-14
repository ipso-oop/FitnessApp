import type { Emoji, EmojiCategory } from '../entities/emoji';
import type { LetterMappings } from '../entities/converterSettings';

export interface EmojiCatalogRepository {
  getAll(): readonly Emoji[];
  getById(id: string): Emoji | undefined;
  getByCategory(category: EmojiCategory): readonly Emoji[];
  getDefaultMappings(): LetterMappings;
  getDefaultGlobalEmoji(): Emoji;
  search(query: string): readonly Emoji[];
}
