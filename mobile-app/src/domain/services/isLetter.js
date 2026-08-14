function isLetter(character) {
  if (!character || character.length === 0) {
    return false;
  }

  return character.toLocaleLowerCase() !== character.toLocaleUpperCase();
}

module.exports = {
  isLetter,
};
