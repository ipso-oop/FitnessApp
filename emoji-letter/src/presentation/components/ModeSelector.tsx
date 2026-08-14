import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  ConversionModes,
  type ConversionMode,
} from '../../domain/entities/conversionMode';
import { modeLabels } from '../i18n/strings';
import { colors, radii, spacing } from '../theme/theme';

const MODES: ConversionMode[] = [
  ConversionModes.PerLetter,
  ConversionModes.Random,
  ConversionModes.Global,
];

type ModeSelectorProps = {
  value: ConversionMode;
  onChange: (mode: ConversionMode) => void;
};

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {MODES.map((mode) => {
        const selected = mode === value;
        return (
          <Pressable
            key={mode}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={modeLabels[mode]}
            onPress={() => onChange(mode)}
            style={({ pressed }) => [
              styles.chip,
              selected && styles.chipSelected,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {modeLabels[mode]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chip: {
    flex: 1,
    backgroundColor: colors.chipInactive,
    borderRadius: radii.pill,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.text,
  },
});
