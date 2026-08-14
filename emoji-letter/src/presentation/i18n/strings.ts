import { ConversionModes, type ConversionMode } from '../../domain/entities/conversionMode';
import { EmojiCategories, type EmojiCategory } from '../../domain/entities/emoji';

export const strings = {
  appTitle: 'Emoji-Buchstaben',
  appSubtitle: 'Jeder Buchstabe wird zum Emoji. Wähle Zuordnungen, Zufall oder ein festes Emoji.',
  inputLabel: 'Dein Text',
  inputPlaceholder: 'Schreibe hier deinen Text…',
  outputLabel: 'Als Emojis',
  outputEmpty: 'Dein Emoji-Text erscheint hier.',
  modePerLetter: 'Pro Buchstabe',
  modeRandom: 'Zufällig',
  modeGlobal: 'Ein Emoji',
  randomize: 'Zufällig neu',
  chooseEmoji: 'Emoji wählen',
  editMappings: 'Buchstaben',
  copy: 'Kopieren',
  copied: 'Kopiert!',
  mappingTitle: 'Buchstaben zuordnen',
  mappingSubtitle: 'Tippe einen Buchstaben, um sein Emoji zu ändern.',
  lettersSection: 'Buchstaben',
  digitsSection: 'Zahlen',
  back: 'Zurück',
  resetDefaults: 'Standard',
  pickerTitle: 'Emoji wählen',
  pickerSearch: 'Emoji suchen…',
  close: 'Schließen',
  allCategories: 'Alle',
  copyError: 'Kopieren nicht möglich.',
} as const;

export const modeLabels: Record<ConversionMode, string> = {
  [ConversionModes.PerLetter]: strings.modePerLetter,
  [ConversionModes.Random]: strings.modeRandom,
  [ConversionModes.Global]: strings.modeGlobal,
};

export const categoryLabels: Record<EmojiCategory, string> = {
  [EmojiCategories.Smileys]: 'Smileys',
  [EmojiCategories.Animals]: 'Tiere',
  [EmojiCategories.Food]: 'Essen',
  [EmojiCategories.Nature]: 'Natur',
  [EmojiCategories.Activities]: 'Spaß',
  [EmojiCategories.Objects]: 'Dinge',
  [EmojiCategories.Symbols]: 'Zeichen',
};
