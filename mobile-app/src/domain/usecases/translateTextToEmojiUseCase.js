const { TranslationMode } = require('../models/translationMode');
const { isLetter } = require('../services/isLetter');

class MathRandomizer {
  nextIndex(maxExclusive) {
    return Math.floor(Math.random() * maxExclusive);
  }
}

class TranslateTextToEmojiUseCase {
  constructor(emojiCatalogRepository, randomizer = new MathRandomizer()) {
    this.emojiCatalogRepository = emojiCatalogRepository;
    this.randomizer = randomizer;
  }

  execute(request) {
    const emojis = this.resolveEmojiPool(request.emojiPool);
    const safeSpecificEmoji = request.specificEmoji || emojis[0];

    const translated = Array.from(request.text || '')
      .map((character) =>
        this.translateCharacter(character, {
          mode: request.mode,
          letterEmojiMap: request.letterEmojiMap || {},
          emojis,
          specificEmoji: safeSpecificEmoji,
        }),
      )
      .join('');

    return {
      translatedText: translated,
    };
  }

  translateCharacter(character, context) {
    if (!isLetter(character)) {
      return character;
    }

    const normalizedLetter = character.toLocaleLowerCase();

    if (context.mode === TranslationMode.SPECIFIC) {
      return context.specificEmoji;
    }

    if (context.mode === TranslationMode.RANDOM) {
      const randomIndex = this.randomizer.nextIndex(context.emojis.length);
      return context.emojis[randomIndex];
    }

    return context.letterEmojiMap[normalizedLetter] || context.emojis[0];
  }

  resolveEmojiPool(requestedPool) {
    const requested = requestedPool || [];
    if (requested.length > 0) {
      return requested;
    }

    const repositoryEmojis = this.emojiCatalogRepository.getAvailableEmojis();
    if (repositoryEmojis.length > 0) {
      return repositoryEmojis;
    }

    return ['🙂'];
  }
}

module.exports = {
  TranslateTextToEmojiUseCase,
  MathRandomizer,
};
