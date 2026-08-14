const React = require('react');
const { StyleSheet, Text, View } = require('react-native');
const { EmojiPicker } = require('./EmojiPicker');

function LetterEmojiSelectorList({
  letters,
  letterEmojiMap,
  emojiOptions,
  onUpdateLetterEmoji,
}) {
  if (letters.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          Gib einen Text ein, dann kannst du Emoji pro Buchstabe auswählen.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {letters.map((letter) => (
        <View key={letter} style={styles.letterCard}>
          <Text style={styles.letterTitle}>Buchstabe: {letter.toUpperCase()}</Text>
          <EmojiPicker
            options={emojiOptions}
            selectedEmoji={letterEmojiMap[letter]}
            onSelect={(emoji) => onUpdateLetterEmoji(letter, emoji)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  letterCard: {
    borderWidth: 1,
    borderColor: '#ebebef',
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  letterTitle: {
    marginBottom: 8,
    fontWeight: '700',
    color: '#1f2937',
  },
  emptyState: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#c7ccff',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#f6f7ff',
  },
  emptyStateText: {
    color: '#475569',
  },
});

module.exports = {
  LetterEmojiSelectorList,
};
