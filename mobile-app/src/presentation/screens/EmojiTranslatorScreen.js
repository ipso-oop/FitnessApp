const React = require('react');
const {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = require('react-native');
const { useEmojiTranslatorViewModel } = require('../../application/hooks/useEmojiTranslatorViewModel');
const { TranslationMode } = require('../../domain/models/translationMode');
const { ModeSelector } = require('../components/ModeSelector');
const { EmojiPicker } = require('../components/EmojiPicker');
const { LetterEmojiSelectorList } = require('../components/LetterEmojiSelectorList');

function EmojiTranslatorScreen() {
  const viewModel = useEmojiTranslatorViewModel();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Emoji Text Converter</Text>
      <Text style={styles.subtitle}>
        Jeder Buchstabe wird in ein Emoji umgewandelt.
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Text eingeben</Text>
        <TextInput
          style={styles.input}
          placeholder="Schreibe hier deinen Text..."
          value={viewModel.inputText}
          onChangeText={viewModel.setInputText}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Modus</Text>
        <ModeSelector selectedMode={viewModel.mode} onChangeMode={viewModel.setMode} />
      </View>

      {viewModel.mode === TranslationMode.SPECIFIC && (
        <View style={styles.section}>
          <Text style={styles.label}>Spezifisches Emoji</Text>
          <EmojiPicker
            options={viewModel.emojiOptions}
            selectedEmoji={viewModel.specificEmoji}
            onSelect={viewModel.setSpecificEmoji}
          />
        </View>
      )}

      {viewModel.mode === TranslationMode.PER_LETTER && (
        <View style={styles.section}>
          <Text style={styles.label}>Emoji pro Buchstabe</Text>
          <LetterEmojiSelectorList
            letters={viewModel.uniqueLetters}
            letterEmojiMap={viewModel.letterEmojiMap}
            emojiOptions={viewModel.emojiOptions}
            onUpdateLetterEmoji={viewModel.updateLetterEmoji}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Ausgabe</Text>
        <View style={styles.outputBox}>
          <Text style={styles.outputText}>
            {viewModel.translatedText || 'Die Emoji-Ausgabe erscheint hier.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    color: '#4b5563',
    marginTop: -8,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  input: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#d9dce5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  outputBox: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#d9dce5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  outputText: {
    fontSize: 22,
    lineHeight: 30,
  },
});

module.exports = {
  EmojiTranslatorScreen,
};
