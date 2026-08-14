import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmojiChoice, LetterEmojiMap } from '../../domain/entities/EmojiText';
import { theme } from '../theme/theme';
import { EmojiPicker } from './EmojiPicker';

type LetterEmojiEditorProps = {
  availableEmojis: EmojiChoice[];
  characters: string[];
  letterEmojis: LetterEmojiMap;
  selectedLetter: string;
  onSelectEmoji: (letter: string, emoji: EmojiChoice) => void;
  onSelectLetter: (letter: string) => void;
};

export const LetterEmojiEditor = ({
  availableEmojis,
  characters,
  letterEmojis,
  onSelectEmoji,
  onSelectLetter,
  selectedLetter,
}: LetterEmojiEditorProps) => {
  if (characters.length === 0) {
    return (
      <Text style={styles.emptyText}>
        Gib mindestens einen Buchstaben oder eine Zahl ein, um individuelle Emojis zu wählen.
      </Text>
    );
  }

  const selectedEmoji = letterEmojis[selectedLetter];

  return (
    <View style={styles.wrapper}>
      <View style={styles.letterRow}>
        {characters.map((character) => {
          const isSelected = character === selectedLetter;

          return (
            <Pressable
              accessibilityRole="button"
              key={character}
              onPress={() => onSelectLetter(character)}
              style={[styles.letterButton, isSelected && styles.letterButtonSelected]}
            >
              <Text style={[styles.letterText, isSelected && styles.letterTextSelected]}>
                {character}
              </Text>
              <Text style={styles.letterEmoji}>{letterEmojis[character]}</Text>
            </Pressable>
          );
        })}
      </View>

      <EmojiPicker
        emojis={availableEmojis}
        onSelect={(emoji) => onSelectEmoji(selectedLetter, emoji)}
        selectedEmoji={selectedEmoji}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  letterButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    minWidth: 56,
    padding: theme.spacing.sm,
  },
  letterButtonSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  letterEmoji: {
    fontSize: 20,
    marginTop: theme.spacing.xs,
  },
  letterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  letterText: {
    color: theme.colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  letterTextSelected: {
    color: theme.colors.white,
  },
  wrapper: {
    gap: theme.spacing.md,
  },
});
