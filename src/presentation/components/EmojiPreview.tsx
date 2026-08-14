import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmojiTextResult } from '../../domain/entities/EmojiText';
import { theme } from '../theme/theme';

type EmojiPreviewProps = {
  result: EmojiTextResult;
};

export const EmojiPreview = ({ result }: EmojiPreviewProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <Text selectable style={styles.previewText}>
          {result.plainOutput}
        </Text>
      </ScrollView>

      <Text style={styles.metaText}>
        {result.characters.length} Zeichen · {result.usedEmojis.join(' ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metaText: {
    color: theme.colors.textSoft,
    fontSize: 13,
  },
  previewText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 26,
    paddingBottom: theme.spacing.sm,
  },
  wrapper: {
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    gap: theme.spacing.md,
    minHeight: 172,
    padding: theme.spacing.md,
  },
});
