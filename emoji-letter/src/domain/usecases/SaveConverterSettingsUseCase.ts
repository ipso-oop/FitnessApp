import type { ConverterSettings } from '../entities/converterSettings';
import type { ConverterSettingsRepository } from '../repositories/ConverterSettingsRepository';

export class SaveConverterSettingsUseCase {
  constructor(private readonly repository: ConverterSettingsRepository) {}

  execute(settings: ConverterSettings): Promise<void> {
    return this.repository.save(settings);
  }
}
