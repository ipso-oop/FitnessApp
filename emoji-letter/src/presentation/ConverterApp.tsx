import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';

import type { AppContainer } from '../di/createAppContainer';
import { EmojiPickerModal } from './components/EmojiPickerModal';
import { useConverterController } from './hooks/useConverterController';
import { ConverterScreen } from './screens/ConverterScreen';
import { MappingScreen } from './screens/MappingScreen';
import { colors } from './theme/theme';
import { strings } from './i18n/strings';

type ConverterAppProps = {
  container: AppContainer;
};

export function ConverterApp({ container }: ConverterAppProps) {
  const controller = useConverterController(container);

  if (!controller.isReady || !controller.settings) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const pickerTitle =
    controller.pickerTarget?.type === 'letter'
      ? `${strings.pickerTitle}: ${controller.pickerTarget.key.toUpperCase()}`
      : strings.pickerTitle;

  return (
    <SafeAreaView style={styles.safe}>
      {controller.screen === 'mapping' ? (
        <MappingScreen controller={controller} />
      ) : (
        <ConverterScreen controller={controller} />
      )}

      <EmojiPickerModal
        visible={controller.pickerTarget !== null}
        title={pickerTitle}
        emojis={controller.catalog}
        onSelect={controller.selectEmoji}
        onClose={() => controller.setPickerTarget(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
