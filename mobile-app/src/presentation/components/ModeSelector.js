const React = require('react');
const { Pressable, StyleSheet, Text, View } = require('react-native');
const { TranslationMode } = require('../../domain/models/translationMode');

const MODES = [
  { key: TranslationMode.PER_LETTER, label: 'Pro Buchstabe' },
  { key: TranslationMode.RANDOM, label: 'Zufällig' },
  { key: TranslationMode.SPECIFIC, label: 'Ein Emoji' },
];

function ModeSelector({ selectedMode, onChangeMode }) {
  return (
    <View style={styles.wrapper}>
      {MODES.map((mode) => {
        const isActive = mode.key === selectedMode;
        return (
          <Pressable
            key={mode.key}
            onPress={() => onChangeMode(mode.key)}
            style={[styles.modeButton, isActive && styles.modeButtonActive]}
          >
            <Text style={[styles.modeLabel, isActive && styles.modeLabelActive]}>
              {mode.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  modeButton: {
    borderWidth: 1,
    borderColor: '#d8d8dd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  modeButtonActive: {
    borderColor: '#5b6cff',
    backgroundColor: '#eef1ff',
  },
  modeLabel: {
    color: '#394150',
    fontWeight: '600',
  },
  modeLabelActive: {
    color: '#2836b1',
  },
});

module.exports = {
  ModeSelector,
};
