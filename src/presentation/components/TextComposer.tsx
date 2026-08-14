import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../theme/theme';

type TextComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export const TextComposer = ({ onChangeText, value }: TextComposerProps) => {
  return (
    <TextInput
      multiline
      onChangeText={onChangeText}
      placeholder="Gib deinen Text ein ..."
      placeholderTextColor={theme.colors.textSoft}
      style={styles.input}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 18,
    minHeight: 96,
    padding: theme.spacing.md,
    textAlignVertical: 'top',
  },
});
