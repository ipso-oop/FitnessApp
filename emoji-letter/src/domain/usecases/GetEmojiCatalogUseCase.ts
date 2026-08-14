import type { Emoji, EmojiCategory } from '../entities/emoji';
import type { EmojiCatalogRepository } from '../repositories/EmojiCatalogRepository';

export class GetEmojiCatalogUseCase {
  constructor(private readonly catalog: EmojiCatalogRepository) {}

  getAll(): readonly Emoji[] {
    return this.catalog.getAll();
  }

  search(query: string): readonly Emoji[] {
    return this.catalog.search(query);
  }

  getByCategory(category: EmojiCategory): readonly Emoji[] {
    return this.catalog.getByCategory(category);
  }
}
