import type { ConverterSettings } from '../entities/converterSettings';

export interface ConverterSettingsRepository {
  load(): Promise<ConverterSettings>;
  save(settings: ConverterSettings): Promise<void>;
}
