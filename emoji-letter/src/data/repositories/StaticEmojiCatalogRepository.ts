import type { LetterMappings } from '../../domain/entities/converterSettings';
import type { Emoji, EmojiCategory } from '../../domain/entities/emoji';
import type { MappableKey } from '../../domain/entities/letterKey';
import { MAPPABLE_KEYS } from '../../domain/entities/letterKey';
import type { EmojiCatalogRepository } from '../../domain/repositories/EmojiCatalogRepository';
import {
  DEFAULT_GLOBAL_EMOJI_ID,
  DEFAULT_MAPPING_IDS,
  EMOJI_CATALOG,
} from '../catalogs/defaultEmojiCatalog';

export class StaticEmojiCatalogRepository implements EmojiCatalogRepository {
  private readonly byId: ReadonlyMap<string, Emoji>;

  constructor(private readonly catalog: readonly Emoji[] = EMOJI_CATALOG) {
    this.byId = new Map(catalog.map((emoji) => [emoji.id, emoji]));
  }

  getAll(): readonly Emoji[] {
    return this.catalog;
  }

  getById(id: string): Emoji | undefined {
    return this.byId.get(id);
  }

  getByCategory(category: EmojiCategory): readonly Emoji[] {
    return this.catalog.filter((emoji) => emoji.category === category);
  }

  getDefaultMappings(): LetterMappings {
    return new Map(
      MAPPABLE_KEYS.map((key) => [key, this.requireMappedEmoji(key)]),
    );
  }

  getDefaultGlobalEmoji(): Emoji {
    const emoji = this.getById(DEFAULT_GLOBAL_EMOJI_ID);
    if (!emoji) {
      throw new Error(`Missing default global emoji: ${DEFAULT_GLOBAL_EMOJI_ID}`);
    }
    return emoji;
  }

  search(query: string): readonly Emoji[] {
    const normalized = query.trim().toLocaleLowerCase('de-DE');
    if (!normalized) {
      return this.catalog;
    }

    return this.catalog.filter(
      (emoji) =>
        emoji.label.toLocaleLowerCase('de-DE').includes(normalized) ||
        emoji.id.includes(normalized) ||
        emoji.glyph.includes(query.trim()),
    );
  }

  private requireMappedEmoji(key: MappableKey): Emoji {
    const emoji = this.getById(DEFAULT_MAPPING_IDS[key]);
    if (!emoji) {
      throw new Error(`Missing default emoji mapping for "${key}"`);
    }
    return emoji;
  }
}
