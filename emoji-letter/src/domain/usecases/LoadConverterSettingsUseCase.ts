import type { ConverterSettings } from '../entities/converterSettings';
import type { ConverterSettingsRepository } from '../repositories/ConverterSettingsRepository';

export class LoadConverterSettingsUseCase {
  constructor(private readonly repository: ConverterSettingsRepository) {}

  execute(): Promise<ConverterSettings> {
    return this.repository.load();
  }
}
