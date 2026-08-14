import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ConversionModes } from '../../domain/entities/conversionMode';
import type { ConverterController } from '../hooks/useConverterController';
import { strings } from '../i18n/strings';
import { colors, spacing, typography } from '../theme/theme';
import { AppButton } from '../components/AppButton';
import { EmojiOutput } from '../components/EmojiOutput';
import { ModeSelector } from '../components/ModeSelector';
import { TextInputCard } from '../components/TextInputCard';

type ConverterScreenProps = {
  controller: ConverterController;
};

export function ConverterScreen({ controller }: ConverterScreenProps) {
  const { settings } = controller;
  if (!settings) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
      <View style={styles.header}>
        <Text style={styles.title}>{strings.appTitle}</Text>
        <Text style={styles.subtitle}>{strings.appSubtitle}</Text>
      </View>

      <ModeSelector value={settings.mode} onChange={controller.setMode} />

      {settings.mode === ConversionModes.Global ? (
        <Pressable
          onPress={() => controller.setPickerTarget({ type: 'global' })}
          style={({ pressed }) => [styles.globalRow, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={strings.chooseEmoji}
        >
          <Text style={styles.globalLabel}>{strings.chooseEmoji}</Text>
          <Text style={styles.globalEmoji}>{settings.globalEmoji.glyph}</Text>
        </Pressable>
      ) : null}

      <TextInputCard value={controller.text} onChangeText={controller.setText} />

      <EmojiOutput
        result={controller.result}
        onGlyphPress={(key) =>
          controller.setPickerTarget({ type: 'letter', key })
        }
      />

      <View style={styles.actions}>
        <View style={styles.actionRow}>
          <View style={styles.action}>
            <AppButton label={strings.randomize} onPress={controller.randomize} />
          </View>
          <View style={styles.action}>
            <AppButton
              label={strings.editMappings}
              onPress={() => controller.setScreen('mapping')}
            />
          </View>
        </View>
        <AppButton
          label={controller.copyFeedback}
          variant="primary"
          disabled={!controller.output}
          onPress={() => {
            void controller.copyOutput();
          }}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    gap: 6,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textMuted,
    lineHeight: 22,
  },
  globalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  globalLabel: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  globalEmoji: {
    fontSize: 32,
  },
  pressed: {
    opacity: 0.82,
  },
  actions: {
    gap: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  action: {
    flex: 1,
  },
});
