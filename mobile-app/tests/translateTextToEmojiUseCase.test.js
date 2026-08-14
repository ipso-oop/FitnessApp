const assert = require('node:assert/strict');
const {
  TranslateTextToEmojiUseCase,
} = require('../src/domain/usecases/translateTextToEmojiUseCase');
const { TranslationMode } = require('../src/domain/models/translationMode');

class FakeEmojiRepository {
  constructor(emojis) {
    this.emojis = emojis;
  }

  getAvailableEmojis() {
    return [...this.emojis];
  }
}

class FakeRandomizer {
  constructor(sequence) {
    this.sequence = sequence;
    this.index = 0;
  }

  nextIndex(maxExclusive) {
    const current = this.sequence[this.index] ?? 0;
    this.index += 1;
    return current % maxExclusive;
  }
}

function testSpecificMode() {
  const useCase = new TranslateTextToEmojiUseCase(new FakeEmojiRepository(['😀']));
  const result = useCase.execute({
    text: 'Hi!',
    mode: TranslationMode.SPECIFIC,
    specificEmoji: '🔥',
    letterEmojiMap: {},
  });

  assert.equal(result.translatedText, '🔥🔥!');
}

function testPerLetterMode() {
  const useCase = new TranslateTextToEmojiUseCase(new FakeEmojiRepository(['😀']));
  const result = useCase.execute({
    text: 'Abba',
    mode: TranslationMode.PER_LETTER,
    specificEmoji: '🔥',
    letterEmojiMap: {
      a: '🐱',
      b: '🐶',
    },
  });

  assert.equal(result.translatedText, '🐱🐶🐶🐱');
}

function testRandomMode() {
  const useCase = new TranslateTextToEmojiUseCase(
    new FakeEmojiRepository(['🌈', '🚀', '✨']),
    new FakeRandomizer([2, 1, 0]),
  );
  const result = useCase.execute({
    text: 'abc',
    mode: TranslationMode.RANDOM,
    specificEmoji: '🔥',
    letterEmojiMap: {},
  });

  assert.equal(result.translatedText, '✨🚀🌈');
}

function run() {
  testSpecificMode();
  testPerLetterMode();
  testRandomMode();
  console.log('All domain tests passed.');
}

run();
