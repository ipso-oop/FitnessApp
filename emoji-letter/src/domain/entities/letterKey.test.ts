import { toMappableKey } from './letterKey';

describe('toMappableKey', () => {
  it('maps latin letters case-insensitively', () => {
    expect(toMappableKey('A')).toBe('a');
    expect(toMappableKey('z')).toBe('z');
  });

  it('maps german umlauts and ß', () => {
    expect(toMappableKey('Ä')).toBe('ä');
    expect(toMappableKey('ö')).toBe('ö');
    expect(toMappableKey('Ü')).toBe('ü');
    expect(toMappableKey('ß')).toBe('ß');
  });

  it('maps digits', () => {
    expect(toMappableKey('7')).toBe('7');
  });

  it('returns null for punctuation and empty input', () => {
    expect(toMappableKey('!')).toBeNull();
    expect(toMappableKey(' ')).toBeNull();
    expect(toMappableKey('')).toBeNull();
  });
});
