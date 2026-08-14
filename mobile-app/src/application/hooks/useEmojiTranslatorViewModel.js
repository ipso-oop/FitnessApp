const React = require('react');
const { TranslationMode } = require('../../domain/models/translationMode');
const { TranslateTextToEmojiUseCase } = require('../../domain/usecases/translateTextToEmojiUseCase');
const {
  StaticEmojiCatalogRepository,
} = require('../../infrastructure/repositories/staticEmojiCatalogRepository');
const { extractUniqueLetters } = require('../services/extractUniqueLetters');

const emojiRepository = new StaticEmojiCatalogRepository();
const translateTextToEmojiUseCase = new TranslateTextToEmojiUseCase(emojiRepository);
const emojiOptions = emojiRepository.getAvailableEmojis();
const defaultEmoji = emojiOptions[0] || '🙂';

function useEmojiTranslatorViewModel() {
  const [inputText, setInputText] = React.useState('');
  const [mode, setMode] = React.useState(TranslationMode.PER_LETTER);
  const [specificEmoji, setSpecificEmoji] = React.useState(defaultEmoji);
  const [letterEmojiMap, setLetterEmojiMap] = React.useState({});

  const uniqueLetters = React.useMemo(
    () => extractUniqueLetters(inputText),
    [inputText],
  );

  React.useEffect(() => {
    setLetterEmojiMap((previous) => {
      const next = { ...previous };
      let changed = false;

      uniqueLetters.forEach((letter) => {
        if (!next[letter]) {
          next[letter] = defaultEmoji;
          changed = true;
        }
      });

      Object.keys(next).forEach((letter) => {
        if (!uniqueLetters.includes(letter)) {
          delete next[letter];
          changed = true;
        }
      });

      return changed ? next : previous;
    });
  }, [uniqueLetters]);

  const translatedText = React.useMemo(() => {
    const result = translateTextToEmojiUseCase.execute({
      text: inputText,
      mode,
      letterEmojiMap,
      specificEmoji,
      emojiPool: emojiOptions,
    });

    return result.translatedText;
  }, [inputText, mode, letterEmojiMap, specificEmoji]);

  const updateLetterEmoji = React.useCallback((letter, emoji) => {
    setLetterEmojiMap((previous) => ({
      ...previous,
      [letter]: emoji,
    }));
  }, []);

  return {
    inputText,
    mode,
    specificEmoji,
    translatedText,
    uniqueLetters,
    letterEmojiMap,
    emojiOptions,
    setInputText,
    setMode,
    setSpecificEmoji,
    updateLetterEmoji,
  };
}

module.exports = {
  useEmojiTranslatorViewModel,
};
