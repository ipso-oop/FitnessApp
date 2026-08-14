import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import { ConversionModes, type ConversionMode } from '../../domain/entities/conversionMode';
import type { ConverterSettings } from '../../domain/entities/converterSettings';
import { toOutputString } from '../../domain/entities/conversionResult';
import type { Emoji } from '../../domain/entities/emoji';
import type { MappableKey } from '../../domain/entities/letterKey';
import type { AppContainer } from '../../di/createAppContainer';
import { strings } from '../i18n/strings';

export type ScreenName = 'converter' | 'mapping';

export type PickerTarget =
  | { type: 'letter'; key: MappableKey }
  | { type: 'global' }
  | null;

export function useConverterController(container: AppContainer) {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<ConverterSettings | null>(null);
  const [screen, setScreen] = useState<ScreenName>('converter');
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [randomNonce, setRandomNonce] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState<string>(strings.copy);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    container.loadSettings.execute().then((loaded) => {
      if (!cancelled) {
        setSettings(loaded);
        setIsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [container]);

  const persist = useCallback(
    async (next: ConverterSettings) => {
      setSettings(next);
      await container.saveSettings.execute(next);
    },
    [container],
  );

  const result = useMemo(() => {
    if (!settings) {
      return null;
    }
    return container.convertText.execute(text, settings);
  }, [container, settings, text, randomNonce]);

  const output = result ? toOutputString(result) : '';
  const catalog = useMemo(() => container.getCatalog.getAll(), [container]);

  const setMode = useCallback(
    (mode: ConversionMode) => {
      if (!settings) {
        return;
      }
      void persist(container.setMode.execute(settings, mode));
    },
    [container, persist, settings],
  );

  const randomize = useCallback(() => {
    if (!settings) {
      return;
    }

    if (settings.mode === ConversionModes.Random) {
      setRandomNonce((value) => value + 1);
      return;
    }

    if (settings.mode === ConversionModes.Global) {
      void persist(container.randomizeGlobalEmoji.execute(settings));
      return;
    }

    void persist(container.randomizeMappings.execute(settings));
  }, [container, persist, settings]);

  const selectEmoji = useCallback(
    (emoji: Emoji) => {
      if (!settings || !pickerTarget) {
        return;
      }

      if (pickerTarget.type === 'global') {
        void persist(container.setGlobalEmoji.execute(settings, emoji));
      } else {
        void persist(
          container.updateLetterEmoji.execute(settings, pickerTarget.key, emoji),
        );
      }

      setPickerTarget(null);
    },
    [container, persist, pickerTarget, settings],
  );

  const resetMappings = useCallback(() => {
    if (!settings) {
      return;
    }
    void persist(container.resetMappings.execute(settings));
  }, [container, persist, settings]);

  const copyOutput = useCallback(async () => {
    if (!output) {
      return;
    }

    try {
      await Clipboard.setStringAsync(output);
      setCopyFeedback(strings.copied);
      setTimeout(() => setCopyFeedback(strings.copy), 1600);
    } catch {
      setCopyFeedback(strings.copyError);
      setTimeout(() => setCopyFeedback(strings.copy), 1600);
    }
  }, [output]);

  return {
    isReady,
    text,
    setText,
    settings,
    result,
    output,
    catalog,
    screen,
    setScreen,
    pickerTarget,
    setPickerTarget,
    copyFeedback,
    setMode,
    randomize,
    selectEmoji,
    resetMappings,
    copyOutput,
  };
}

export type ConverterController = ReturnType<typeof useConverterController>;
