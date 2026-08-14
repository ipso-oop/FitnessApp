import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConversionModes } from '../../domain/entities/conversionMode';
import type { ConversionResult } from '../../domain/entities/conversionResult';
import { GlyphKinds } from '../../domain/entities/glyph';
import type { MappableKey } from '../../domain/entities/letterKey';
import { strings } from '../i18n/strings';
import { colors, radii, spacing, typography } from '../theme/theme';

type EmojiOutputProps = {
  result: ConversionResult | null;
  onGlyphPress: (key: MappableKey) => void;
};

export function EmojiOutput({ result, onGlyphPress }: EmojiOutputProps) {
  const isEmpty = !result || result.sourceText.length === 0;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{strings.outputLabel}</Text>
      {isEmpty ? (
        <Text style={styles.empty}>{strings.outputEmpty}</Text>
      ) : (
        <View style={styles.wrap}>
          {result.glyphs.map((glyph) => {
            if (glyph.kind === GlyphKinds.Newline) {
              return <View key={glyph.index} style={styles.newline} />;
            }

            if (glyph.kind === GlyphKinds.Space) {
              return <View key={glyph.index} style={styles.space} />;
            }

            const canEdit =
              result.mode === ConversionModes.PerLetter &&
              glyph.mappableKey !== null;

            return (
              <Pressable
                key={glyph.index}
                disabled={!canEdit}
                onPress={() => {
                  if (glyph.mappableKey) {
                    onGlyphPress(glyph.mappableKey);
                  }
                }}
                accessibilityRole={canEdit ? 'button' : 'text'}
                accessibilityLabel={`${glyph.source} ${glyph.display}`}
                style={({ pressed }) => [
                  styles.glyph,
                  canEdit && pressed && styles.pressed,
                ]}
              >
                <Text style={styles.emoji}>{glyph.display}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
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
    minHeight: 140,
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  glyph: {
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  emoji: {
    ...typography.emoji,
  },
  space: {
    width: 14,
    height: 32,
  },
  newline: {
    width: '100%',
    height: 8,
  },
});
