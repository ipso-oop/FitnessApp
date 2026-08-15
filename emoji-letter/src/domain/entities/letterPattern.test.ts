import { countFilledCells, parseLetterPattern } from './letterPattern';

describe('parseLetterPattern', () => {
  it('parses X cells as filled pixels', () => {
    const pattern = parseLetterPattern(['X.', '.X']);

    expect(pattern.width).toBe(2);
    expect(pattern.height).toBe(2);
    expect(pattern.cells).toEqual([
      [true, false],
      [false, true],
    ]);
    expect(countFilledCells(pattern)).toBe(2);
  });

  it('rejects rows of different width', () => {
    expect(() => parseLetterPattern(['X', 'XX'])).toThrow(
      'Letter pattern rows must have the same width.',
    );
  });
});
