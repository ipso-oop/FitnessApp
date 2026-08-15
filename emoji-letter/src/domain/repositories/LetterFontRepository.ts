import type { LetterPattern } from '../entities/letterPattern';
import type { MappableKey } from '../entities/letterKey';

export interface LetterFontRepository {
  getPattern(key: MappableKey): LetterPattern;
  getSpacePattern(): LetterPattern;
  findPattern(character: string): LetterPattern | null;
}
