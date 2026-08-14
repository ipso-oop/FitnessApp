import { StyleSheet, Text, TextInput, View } from 'react-native';

import { strings } from '../i18n/strings';
import { colors, radii, spacing, typography } from '../theme/theme';

type TextInputCardProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function TextInputCard({ value, onChangeText }: TextInputCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{strings.inputLabel}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={strings.inputPlaceholder}
        placeholderTextColor={colors.textMuted}
        multiline
        textAlignVertical="top"
        autoCorrect
        accessibilityLabel={strings.inputLabel}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    minHeight: 92,
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
});
