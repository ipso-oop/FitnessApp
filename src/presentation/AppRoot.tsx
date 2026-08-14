import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEmojiTextViewModel } from '../application/useEmojiTextViewModel';
import { EmojiPreview } from './components/EmojiPreview';
import { EmojiSelector } from './components/EmojiSelector';
import { LetterEmojiEditor } from './components/LetterEmojiEditor';
import { ModeSelector } from './components/ModeSelector';
import { SectionCard } from './components/SectionCard';
import { TextComposer } from './components/TextComposer';
import { theme } from './theme/theme';

export const AppRoot = () => {
  const viewModel = useEmojiTextViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Emoji Letter Studio</Text>
          <Text style={styles.title}>Verwandle Text in Emoji-Kunst</Text>
          <Text style={styles.subtitle}>
            Schreibe einen Text, wähle ein Emoji für alle Zeichen, lasse zufällig würfeln
            oder definiere jedes Zeichen individuell.
          </Text>
        </View>

        <SectionCard
          description="Die App rendert Buchstaben, Zahlen und einfache Satzzeichen als 5x5-Emoji-Muster."
          title="1. Text eingeben"
        >
          <TextComposer onChangeText={viewModel.setInput} value={viewModel.input} />
        </SectionCard>

        <SectionCard
          description="Wähle aus, ob ein festes Emoji, zufällige Emojis oder eigene Emojis pro Buchstabe verwendet werden."
          title="2. Darstellung wählen"
        >
          <ModeSelector onChange={viewModel.setMode} value={viewModel.mode} />

          {viewModel.mode === 'single' ? (
            <EmojiSelector
              availableEmojis={viewModel.availableEmojis}
              onSelectEmoji={viewModel.setSelectedEmoji}
              selectedEmoji={viewModel.selectedEmoji}
            />
          ) : null}

          {viewModel.mode === 'random' ? (
            <Pressable
              accessibilityRole="button"
              onPress={viewModel.refreshRandomEmojis}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Random Emojis neu wählen</Text>
            </Pressable>
          ) : null}

          {viewModel.mode === 'perLetter' ? (
            <LetterEmojiEditor
              availableEmojis={viewModel.availableEmojis}
              characters={viewModel.editableCharacters}
              letterEmojis={viewModel.letterEmojis}
              onSelectEmoji={viewModel.selectEmojiForLetter}
              onSelectLetter={viewModel.setSelectedLetter}
              selectedLetter={viewModel.selectedLetter}
            />
          ) : null}
        </SectionCard>

        <SectionCard
          description="Die Vorschau kann markiert und kopiert werden, um sie in Chats oder Notizen zu verwenden."
          title="3. Ergebnis"
        >
          <EmojiPreview result={viewModel.result} />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl * 2,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  hero: {
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.lg,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.md,
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,
  },
});
