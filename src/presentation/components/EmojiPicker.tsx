import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmojiChoice } from '../../domain/entities/EmojiText';
import { theme } from '../theme/theme';

type EmojiPickerProps = {
  emojis: EmojiChoice[];
  selectedEmoji?: string;
  onSelect: (emoji: EmojiChoice) => void;
};

export const EmojiPicker = ({ emojis, onSelect, selectedEmoji }: EmojiPickerProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {emojis.map((emoji) => {
          const isSelected = selectedEmoji === emoji.value;

          return (
            <Pressable
              accessibilityLabel={`${emoji.label} auswählen`}
              accessibilityRole="button"
              key={`${emoji.label}-${emoji.value}`}
              onPress={() => onSelect(emoji)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <Text style={styles.emoji}>{emoji.value}</Text>
              <Text style={styles.label}>{emoji.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 28,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginTop: theme.spacing.xs,
  },
  option: {
    alignItems: 'center',
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    minWidth: 72,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
