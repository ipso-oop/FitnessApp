import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { EmojiCategories, type Emoji, type EmojiCategory } from '../../domain/entities/emoji';
import { categoryLabels, strings } from '../i18n/strings';
import { colors, radii, spacing } from '../theme/theme';
import { AppButton } from './AppButton';

const CATEGORY_FILTERS: Array<EmojiCategory | 'all'> = [
  'all',
  EmojiCategories.Smileys,
  EmojiCategories.Animals,
  EmojiCategories.Food,
  EmojiCategories.Nature,
  EmojiCategories.Activities,
  EmojiCategories.Objects,
  EmojiCategories.Symbols,
];

type EmojiPickerModalProps = {
  visible: boolean;
  title?: string;
  emojis: readonly Emoji[];
  onSelect: (emoji: Emoji) => void;
  onClose: () => void;
};

export function EmojiPickerModal({
  visible,
  title = strings.pickerTitle,
  emojis,
  onSelect,
  onClose,
}: EmojiPickerModalProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<EmojiCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('de-DE');
    return emojis.filter((emoji) => {
      const matchesCategory = category === 'all' || emoji.category === category;
      const matchesQuery =
        !normalized ||
        emoji.label.toLocaleLowerCase('de-DE').includes(normalized) ||
        emoji.id.includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, emojis, query]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} accessibilityRole="button">
              <Text style={styles.close}>{strings.close}</Text>
            </Pressable>
          </View>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={strings.pickerSearch}
            placeholderTextColor={colors.textMuted}
            style={styles.search}
            accessibilityLabel={strings.pickerSearch}
          />

          <View style={styles.categories}>
            {CATEGORY_FILTERS.map((item) => {
              const selected = item === category;
              const label =
                item === 'all' ? strings.allCategories : categoryLabels[item];
              return (
                <Pressable
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[styles.category, selected && styles.categorySelected]}
                >
                  <Text
                    style={[
                      styles.categoryLabel,
                      selected && styles.categoryLabelSelected,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            numColumns={6}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onSelect(item)}
                style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
                accessibilityLabel={item.label}
              >
                <Text style={styles.glyph}>{item.glyph}</Text>
              </Pressable>
            )}
          />

          <AppButton label={strings.close} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(8, 6, 18, 0.72)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.md,
    maxHeight: '86%',
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  close: {
    color: colors.secondary,
    fontWeight: '700',
  },
  search: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  category: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categorySelected: {
    backgroundColor: colors.secondary,
  },
  categoryLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  categoryLabelSelected: {
    color: colors.text,
  },
  grid: {
    paddingVertical: spacing.sm,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '16.6%',
  },
  pressed: {
    opacity: 0.7,
  },
  glyph: {
    fontSize: 28,
  },
});
