const { EmojiCatalogRepository } = require('../../domain/repositories/emojiCatalogRepository');

const DEFAULT_EMOJIS = Object.freeze([
  '😀',
  '😎',
  '🔥',
  '✨',
  '🎉',
  '🍀',
  '🚀',
  '🌈',
  '💡',
  '💎',
  '🐱',
  '🐶',
]);

class StaticEmojiCatalogRepository extends EmojiCatalogRepository {
  getAvailableEmojis() {
    return [...DEFAULT_EMOJIS];
  }
}

module.exports = {
  StaticEmojiCatalogRepository,
  DEFAULT_EMOJIS,
};
