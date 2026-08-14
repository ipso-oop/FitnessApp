import { useEffect, useMemo, useState } from 'react';
import {
  EmojiChoice,
  EmojiRenderMode,
  LetterEmojiMap,
} from '../domain/entities/EmojiText';
import {
  createDefaultLetterEmojiMap,
  getEditableCharacters,
  normalizeInputCharacter,
  renderEmojiText,
} from '../domain/services/EmojiTextRenderer';
import {
  DEFAULT_EMOJI_CATALOG,
  DEFAULT_SINGLE_EMOJI,
} from '../data/emojiCatalog/defaultEmojiCatalog';

const INITIAL_TEXT = 'Hallo Emoji';

export const useEmojiTextViewModel = () => {
  const [input, setInput] = useState(INITIAL_TEXT);
  const [mode, setMode] = useState<EmojiRenderMode>('single');
  const [selectedEmoji, setSelectedEmoji] = useState(DEFAULT_SINGLE_EMOJI);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [randomSeed, setRandomSeed] = useState(() => Date.now());
  const [letterEmojis, setLetterEmojis] = useState<LetterEmojiMap>(() =>
    createDefaultLetterEmojiMap(INITIAL_TEXT, DEFAULT_EMOJI_CATALOG),
  );

  const editableCharacters = useMemo(() => getEditableCharacters(input), [input]);

  useEffect(() => {
    setLetterEmojis((currentEmojiMap) => {
      const defaultEmojiMap = createDefaultLetterEmojiMap(input, DEFAULT_EMOJI_CATALOG);
      const nextEmojiMap = editableCharacters.reduce<LetterEmojiMap>((emojiMap, character) => {
        emojiMap[character] = currentEmojiMap[character] ?? defaultEmojiMap[character];
        return emojiMap;
      }, {});

      return nextEmojiMap;
    });
  }, [editableCharacters, input]);

  useEffect(() => {
    if (editableCharacters.length === 0) {
      setSelectedLetter('');
      return;
    }

    if (!editableCharacters.includes(selectedLetter)) {
      setSelectedLetter(editableCharacters[0]);
    }
  }, [editableCharacters, selectedLetter]);

  const result = useMemo(
    () =>
      renderEmojiText(input, {
        emojiCatalog: DEFAULT_EMOJI_CATALOG,
        mode,
        perLetterEmojis: letterEmojis,
        randomSeed,
        selectedEmoji,
      }),
    [input, letterEmojis, mode, randomSeed, selectedEmoji],
  );

  const selectEmojiForLetter = (letter: string, emoji: EmojiChoice) => {
    const normalizedLetter = normalizeInputCharacter(letter);

    setLetterEmojis((currentEmojiMap) => ({
      ...currentEmojiMap,
      [normalizedLetter]: emoji.value,
    }));
  };

  const refreshRandomEmojis = () => {
    setRandomSeed(Date.now());
  };

  return {
    availableEmojis: DEFAULT_EMOJI_CATALOG,
    editableCharacters,
    input,
    letterEmojis,
    mode,
    result,
    selectedEmoji,
    selectedLetter,
    refreshRandomEmojis,
    selectEmojiForLetter,
    setInput,
    setMode,
    setSelectedEmoji,
    setSelectedLetter,
  };
};
