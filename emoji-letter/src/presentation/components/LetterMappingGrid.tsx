import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { LetterMappings } from '../../domain/entities/converterSettings';
import { DIGIT_KEYS, LETTER_KEYS, type MappableKey } from '../../domain/entities/letterKey';
import { strings } from '../i18n/strings';
import { colors, radii, spacing } from '../theme/theme';

type LetterMappingGridProps = {
  mappings: LetterMappings;
  onSelectKey: (key: MappableKey) => void;
};

export function LetterMappingGrid({
  mappings,
  onSelectKey,
}: LetterMappingGridProps) {
  return (
    <View style={styles.container}>
      <Section title={strings.lettersSection} keys={LETTER_KEYS} mappings={mappings} onSelectKey={onSelectKey} />
      <Section title={strings.digitsSection} keys={DIGIT_KEYS} mappings={mappings} onSelectKey={onSelectKey} />
    </View>
  );
}

type SectionProps = {
  title: string;
  keys: readonly MappableKey[];
  mappings: LetterMappings;
  onSelectKey: (key: MappableKey) => void;
};

function Section({ title, keys, mappings, onSelectKey }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {keys.map((key) => {
          const emoji = mappings.get(key);
          return (
            <Pressable
              key={key}
              onPress={() => onSelectKey(key)}
              style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={`${key.toUpperCase()} ${emoji?.label ?? ''}`}
            >
              <Text style={styles.letter}>{key.toUpperCase()}</Text>
              <Text style={styles.emoji}>{emoji?.glyph ?? '❓'}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cell: {
    width: '18%',
    minWidth: 58,
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  pressed: {
    backgroundColor: colors.surfaceHover,
  },
  letter: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  emoji: {
    fontSize: 26,
  },
});
