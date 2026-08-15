import type { LetterPattern } from '../../domain/entities/letterPattern';
import { isMappableKey, type MappableKey } from '../../domain/entities/letterKey';
import type { LetterFontRepository } from '../../domain/repositories/LetterFontRepository';
import {
  BITMAP_PATTERNS,
  PUNCTUATION_PATTERNS,
  SPACE_PATTERN,
} from './bitmapPatterns';

export class BitmapLetterFont implements LetterFontRepository {
  getPattern(key: MappableKey): LetterPattern {
    const pattern = BITMAP_PATTERNS[key];
    if (!pattern) {
      throw new Error(`Missing letter pattern for "${key}".`);
    }
    return pattern;
  }

  getSpacePattern(): LetterPattern {
    return SPACE_PATTERN;
  }

  findPattern(character: string): LetterPattern | null {
    if (character.length === 0) {
      return null;
    }

    const normalized = character.toLocaleLowerCase('de-DE');
    if (isMappableKey(normalized)) {
      return this.getPattern(normalized);
    }

    return PUNCTUATION_PATTERNS[character] ?? null;
  }
}
