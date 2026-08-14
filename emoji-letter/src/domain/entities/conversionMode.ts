export const ConversionModes = {
  PerLetter: 'perLetter',
  Random: 'random',
  Global: 'global',
} as const;

export type ConversionMode =
  (typeof ConversionModes)[keyof typeof ConversionModes];

const MODE_VALUES = new Set<string>(Object.values(ConversionModes));

export function isConversionMode(value: string): value is ConversionMode {
  return MODE_VALUES.has(value);
}
