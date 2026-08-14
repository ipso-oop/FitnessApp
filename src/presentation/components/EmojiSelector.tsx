import { StyleSheet, Text, TextInput, View } from 'react-native';
import { EmojiChoice } from '../../domain/entities/EmojiText';
import { theme } from '../theme/theme';
import { EmojiPicker } from './EmojiPicker';

type EmojiSelectorProps = {
  availableEmojis: EmojiChoice[];
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
};

export const EmojiSelector = ({
  availableEmojis,
  onSelectEmoji,
  selectedEmoji,
}: EmojiSelectorProps) => {
  return (
    <View style={styles.wrapper}>
      <EmojiPicker
        emojis={availableEmojis}
        onSelect={(emoji) => onSelectEmoji(emoji.value)}
        selectedEmoji={selectedEmoji}
      />

      <View style={styles.customRow}>
        <Text style={styles.customLabel}>Eigenes Emoji</Text>
        <TextInput
          maxLength={8}
          onChangeText={(value) => onSelectEmoji(value.trim() || selectedEmoji)}
          placeholder="z. B. 🦄"
          placeholderTextColor={theme.colors.textSoft}
          style={styles.customInput}
          value={selectedEmoji}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customInput: {
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    color: theme.colors.text,
    flex: 1,
    fontSize: 22,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  customLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  customRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  wrapper: {
    gap: theme.spacing.md,
  },
});
