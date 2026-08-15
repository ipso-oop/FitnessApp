import { countFilledCells } from '../../domain/entities/letterPattern';
import { MAPPABLE_KEYS } from '../../domain/entities/letterKey';
import { BitmapLetterFont } from './BitmapLetterFont';

describe('BitmapLetterFont', () => {
  const font = new BitmapLetterFont();

  it('provides a filled 5x7 pattern for every mappable key', () => {
    for (const key of MAPPABLE_KEYS) {
      const pattern = font.getPattern(key);
      expect(pattern.width).toBe(5);
      expect(pattern.height).toBe(7);
      expect(countFilledCells(pattern)).toBeGreaterThan(0);
    }
  });

  it('draws a recognizable A shape', () => {
    expect(font.getPattern('a').cells.map((row) => row.map((cell) => (cell ? 'X' : '.')).join(''))).toEqual([
      '.XXX.',
      'X...X',
      'X...X',
      'XXXXX',
      'X...X',
      'X...X',
      'X...X',
    ]);
  });

  it('finds punctuation patterns', () => {
    expect(font.findPattern('!')).not.toBeNull();
    expect(font.findPattern('?')).not.toBeNull();
    expect(font.findPattern('#')).toBeNull();
  });
});
