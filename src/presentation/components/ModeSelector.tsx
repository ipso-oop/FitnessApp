import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmojiRenderMode } from '../../domain/entities/EmojiText';
import { theme } from '../theme/theme';

type ModeOption = {
  label: string;
  value: EmojiRenderMode;
};

const MODE_OPTIONS: ModeOption[] = [
  { label: 'Ein Emoji', value: 'single' },
  { label: 'Random', value: 'random' },
  { label: 'Pro Buchstabe', value: 'perLetter' },
];

type ModeSelectorProps = {
  value: EmojiRenderMode;
  onChange: (value: EmojiRenderMode) => void;
};

export const ModeSelector = ({ onChange, value }: ModeSelectorProps) => {
  return (
    <View style={styles.wrapper}>
      {MODE_OPTIONS.map((option) => {
        const isActive = option.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, isActive && styles.optionActive]}
          >
            <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    alignItems: 'center',
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  optionActive: {
    backgroundColor: theme.colors.primaryDark,
    borderColor: theme.colors.primary,
  },
  optionText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  optionTextActive: {
    color: theme.colors.white,
  },
  wrapper: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
