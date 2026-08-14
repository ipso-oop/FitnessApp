import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { ConverterController } from '../hooks/useConverterController';
import { strings } from '../i18n/strings';
import { colors, spacing, typography } from '../theme/theme';
import { AppButton } from '../components/AppButton';
import { LetterMappingGrid } from '../components/LetterMappingGrid';

type MappingScreenProps = {
  controller: ConverterController;
};

export function MappingScreen({ controller }: MappingScreenProps) {
  const { settings } = controller;
  if (!settings) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <View style={styles.topButton}>
          <AppButton
            label={strings.back}
            variant="ghost"
            onPress={() => controller.setScreen('converter')}
          />
        </View>
        <View style={styles.topButton}>
          <AppButton
            label={strings.resetDefaults}
            variant="ghost"
            onPress={controller.resetMappings}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{strings.mappingTitle}</Text>
        <Text style={styles.subtitle}>{strings.mappingSubtitle}</Text>
        <LetterMappingGrid
          mappings={settings.letterMappings}
          onSelectKey={(key) => controller.setPickerTarget({ type: 'letter', key })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  topButton: {
    minWidth: 110,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.text,
    fontSize: 24,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textMuted,
    lineHeight: 22,
  },
});
