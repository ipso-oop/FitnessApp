import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConversionModes } from '../../domain/entities/conversionMode';
import type { ConversionResult } from '../../domain/entities/conversionResult';
import type { Glyph } from '../../domain/entities/glyph';
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
        <View style={styles.lines}>
          {result.lines.map((line, lineIndex) => (
            <ScrollView
              key={`line-${lineIndex}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.line}
            >
              {line.map((glyph) => (
                <DrawnGlyph
                  key={glyph.index}
                  glyph={glyph}
                  canEdit={
                    result.mode === ConversionModes.PerLetter &&
                    glyph.mappableKey !== null
                  }
                  onPress={() => {
                    if (glyph.mappableKey) {
                      onGlyphPress(glyph.mappableKey);
                    }
                  }}
                />
              ))}
            </ScrollView>
          ))}
        </View>
      )}
    </View>
  );
}

type DrawnGlyphProps = {
  glyph: Glyph;
  canEdit: boolean;
  onPress: () => void;
};

function DrawnGlyph({ glyph, canEdit, onPress }: DrawnGlyphProps) {
  if (glyph.kind === GlyphKinds.Space) {
    return <View style={styles.space} />;
  }

  if (glyph.kind === GlyphKinds.Passthrough) {
    return (
      <View style={styles.passthrough}>
        <Text style={styles.passthroughText}>{glyph.source}</Text>
      </View>
    );
  }

  return (
    <Pressable
      disabled={!canEdit}
      onPress={onPress}
      accessibilityRole={canEdit ? 'button' : 'text'}
      accessibilityLabel={strings.letterArtLabel(glyph.source)}
      style={({ pressed }) => [
        styles.letter,
        canEdit && pressed && styles.pressed,
      ]}
    >
      {glyph.pixels.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((pixel, column) => (
            <View key={`${rowIndex}-${column}`} style={styles.cell}>
              <Text style={styles.pixel}>
                {pixel.filled && pixel.emoji ? pixel.emoji.glyph : ' '}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </Pressable>
  );
}

const PIXEL_SIZE = 16;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 160,
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
  lines: {
    gap: spacing.md,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingRight: spacing.md,
  },
  letter: {
    padding: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: PIXEL_SIZE,
    height: PIXEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pixel: {
    fontSize: 12,
    lineHeight: PIXEL_SIZE,
  },
  space: {
    width: 18,
    height: PIXEL_SIZE * 7,
  },
  passthrough: {
    minWidth: PIXEL_SIZE,
    height: PIXEL_SIZE * 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passthroughText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
