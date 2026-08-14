const { isLetter } = require('../../domain/services/isLetter');

function extractUniqueLetters(text) {
  const uniqueLetters = [];
  const seen = new Set();

  Array.from(text || '').forEach((character) => {
    if (!isLetter(character)) {
      return;
    }

    const normalized = character.toLocaleLowerCase();
    if (seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    uniqueLetters.push(normalized);
  });

  return uniqueLetters;
}

module.exports = {
  extractUniqueLetters,
};
