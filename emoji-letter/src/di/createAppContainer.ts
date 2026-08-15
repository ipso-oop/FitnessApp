import { ConvertTextToEmojisUseCase } from '../domain/usecases/ConvertTextToEmojisUseCase';
import { GetEmojiCatalogUseCase } from '../domain/usecases/GetEmojiCatalogUseCase';
import { LoadConverterSettingsUseCase } from '../domain/usecases/LoadConverterSettingsUseCase';
import { RandomizeGlobalEmojiUseCase } from '../domain/usecases/RandomizeGlobalEmojiUseCase';
import { RandomizeLetterMappingsUseCase } from '../domain/usecases/RandomizeLetterMappingsUseCase';
import { ResetMappingsUseCase } from '../domain/usecases/ResetMappingsUseCase';
import { SaveConverterSettingsUseCase } from '../domain/usecases/SaveConverterSettingsUseCase';
import { SetConversionModeUseCase } from '../domain/usecases/SetConversionModeUseCase';
import { SetGlobalEmojiUseCase } from '../domain/usecases/SetGlobalEmojiUseCase';
import { UpdateLetterEmojiUseCase } from '../domain/usecases/UpdateLetterEmojiUseCase';
import { BitmapLetterFont } from '../data/fonts/BitmapLetterFont';
import { AsyncStorageConverterSettingsRepository } from '../data/repositories/AsyncStorageConverterSettingsRepository';
import { StaticEmojiCatalogRepository } from '../data/repositories/StaticEmojiCatalogRepository';
import { MathRandomSource } from '../data/services/MathRandomSource';
import type { ConverterSettingsRepository } from '../domain/repositories/ConverterSettingsRepository';
import type { EmojiCatalogRepository } from '../domain/repositories/EmojiCatalogRepository';
import type { LetterFontRepository } from '../domain/repositories/LetterFontRepository';
import type { RandomSource } from '../domain/services/RandomSource';

export type AppContainer = {
  catalog: EmojiCatalogRepository;
  convertText: ConvertTextToEmojisUseCase;
  getCatalog: GetEmojiCatalogUseCase;
  loadSettings: LoadConverterSettingsUseCase;
  saveSettings: SaveConverterSettingsUseCase;
  setMode: SetConversionModeUseCase;
  setGlobalEmoji: SetGlobalEmojiUseCase;
  updateLetterEmoji: UpdateLetterEmojiUseCase;
  randomizeMappings: RandomizeLetterMappingsUseCase;
  randomizeGlobalEmoji: RandomizeGlobalEmojiUseCase;
  resetMappings: ResetMappingsUseCase;
};

export function createAppContainer(
  overrides: {
    catalog?: EmojiCatalogRepository;
    settingsRepository?: ConverterSettingsRepository;
    randomSource?: RandomSource;
    font?: LetterFontRepository;
  } = {},
): AppContainer {
  const catalog = overrides.catalog ?? new StaticEmojiCatalogRepository();
  const randomSource = overrides.randomSource ?? new MathRandomSource();
  const font = overrides.font ?? new BitmapLetterFont();
  const settingsRepository =
    overrides.settingsRepository ??
    new AsyncStorageConverterSettingsRepository(catalog);

  return {
    catalog,
    convertText: new ConvertTextToEmojisUseCase(catalog, randomSource, font),
    getCatalog: new GetEmojiCatalogUseCase(catalog),
    loadSettings: new LoadConverterSettingsUseCase(settingsRepository),
    saveSettings: new SaveConverterSettingsUseCase(settingsRepository),
    setMode: new SetConversionModeUseCase(),
    setGlobalEmoji: new SetGlobalEmojiUseCase(),
    updateLetterEmoji: new UpdateLetterEmojiUseCase(),
    randomizeMappings: new RandomizeLetterMappingsUseCase(catalog, randomSource),
    randomizeGlobalEmoji: new RandomizeGlobalEmojiUseCase(catalog, randomSource),
    resetMappings: new ResetMappingsUseCase(catalog),
  };
}
