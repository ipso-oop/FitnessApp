import type { ConversionMode } from './conversionMode';
import type { Emoji } from './emoji';
import type { MappableKey } from './letterKey';

export type LetterMappings = ReadonlyMap<MappableKey, Emoji>;

export type ConverterSettings = Readonly<{
  mode: ConversionMode;
  letterMappings: LetterMappings;
  globalEmoji: Emoji;
}>;

export function withMode(
  settings: ConverterSettings,
  mode: ConversionMode,
): ConverterSettings {
  return {
    ...settings,
    mode,
  };
}

export function withGlobalEmoji(
  settings: ConverterSettings,
  emoji: Emoji,
): ConverterSettings {
  return {
    ...settings,
    globalEmoji: emoji,
  };
}

export function withLetterEmoji(
  settings: ConverterSettings,
  key: MappableKey,
  emoji: Emoji,
): ConverterSettings {
  const letterMappings = new Map(settings.letterMappings);
  letterMappings.set(key, emoji);

  return {
    ...settings,
    letterMappings,
  };
}

export function withLetterMappings(
  settings: ConverterSettings,
  letterMappings: LetterMappings,
): ConverterSettings {
  return {
    ...settings,
    letterMappings,
  };
}
