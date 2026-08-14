const React = require('react');
const { Pressable, ScrollView, StyleSheet, Text, View } = require('react-native');

function EmojiPicker({ options, selectedEmoji, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {options.map((emoji) => {
          const isSelected = emoji === selectedEmoji;
          return (
            <Pressable
              key={emoji}
              onPress={() => onSelect(emoji)}
              style={[styles.emojiButton, isSelected && styles.emojiButtonSelected]}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emojiButton: {
    borderWidth: 1,
    borderColor: '#d8d8dd',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  emojiButtonSelected: {
    borderColor: '#5b6cff',
    backgroundColor: '#eef1ff',
  },
  emojiText: {
    fontSize: 22,
  },
});

module.exports = {
  EmojiPicker,
};
