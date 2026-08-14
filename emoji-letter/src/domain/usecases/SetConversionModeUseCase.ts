import type { ConversionMode } from '../entities/conversionMode';
import type { ConverterSettings } from '../entities/converterSettings';
import { withMode } from '../entities/converterSettings';

export class SetConversionModeUseCase {
  execute(
    settings: ConverterSettings,
    mode: ConversionMode,
  ): ConverterSettings {
    return withMode(settings, mode);
  }
}
