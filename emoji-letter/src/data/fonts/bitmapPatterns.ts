import { parseLetterPattern, type LetterPattern } from '../../domain/entities/letterPattern';
import type { MappableKey } from '../../domain/entities/letterKey';

function pattern(...rows: string[]): LetterPattern {
  return parseLetterPattern(rows);
}

export const LETTER_HEIGHT = 7;

export const SPACE_PATTERN = pattern('...', '...', '...', '...', '...', '...', '...');

export const BITMAP_PATTERNS: Readonly<Record<MappableKey, LetterPattern>> = {
  a: pattern('.XXX.', 'X...X', 'X...X', 'XXXXX', 'X...X', 'X...X', 'X...X'),
  b: pattern('XXXX.', 'X...X', 'X...X', 'XXXX.', 'X...X', 'X...X', 'XXXX.'),
  c: pattern('.XXX.', 'X...X', 'X....', 'X....', 'X....', 'X...X', '.XXX.'),
  d: pattern('XXXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'XXXX.'),
  e: pattern('XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'XXXXX'),
  f: pattern('XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'X....'),
  g: pattern('.XXX.', 'X...X', 'X....', 'X.XXX', 'X...X', 'X...X', '.XXX.'),
  h: pattern('X...X', 'X...X', 'X...X', 'XXXXX', 'X...X', 'X...X', 'X...X'),
  i: pattern('.XXX.', '..X..', '..X..', '..X..', '..X..', '..X..', '.XXX.'),
  j: pattern('..XXX', '...X.', '...X.', '...X.', '...X.', 'X..X.', '.XX..'),
  k: pattern('X...X', 'X..X.', 'X.X..', 'XX...', 'X.X..', 'X..X.', 'X...X'),
  l: pattern('X....', 'X....', 'X....', 'X....', 'X....', 'X....', 'XXXXX'),
  m: pattern('X...X', 'XX.XX', 'X.X.X', 'X...X', 'X...X', 'X...X', 'X...X'),
  n: pattern('X...X', 'XX..X', 'X.X.X', 'X..XX', 'X...X', 'X...X', 'X...X'),
  o: pattern('.XXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'),
  p: pattern('XXXX.', 'X...X', 'X...X', 'XXXX.', 'X....', 'X....', 'X....'),
  q: pattern('.XXX.', 'X...X', 'X...X', 'X...X', 'X.X.X', 'X..X.', '.XX.X'),
  r: pattern('XXXX.', 'X...X', 'X...X', 'XXXX.', 'X.X..', 'X..X.', 'X...X'),
  s: pattern('.XXXX', 'X....', 'X....', '.XXX.', '....X', '....X', 'XXXX.'),
  t: pattern('XXXXX', '..X..', '..X..', '..X..', '..X..', '..X..', '..X..'),
  u: pattern('X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'),
  v: pattern('X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.X.X.', '..X..'),
  w: pattern('X...X', 'X...X', 'X...X', 'X...X', 'X.X.X', 'XX.XX', 'X...X'),
  x: pattern('X...X', 'X...X', '.X.X.', '..X..', '.X.X.', 'X...X', 'X...X'),
  y: pattern('X...X', 'X...X', '.X.X.', '..X..', '..X..', '..X..', '..X..'),
  z: pattern('XXXXX', '....X', '...X.', '..X..', '.X...', 'X....', 'XXXXX'),
  ä: pattern('X...X', '.XXX.', 'X...X', 'XXXXX', 'X...X', 'X...X', 'X...X'),
  ö: pattern('X...X', '.XXX.', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'),
  ü: pattern('X...X', '.....', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'),
  ß: pattern('.XXX.', 'X...X', 'X...X', 'XXXX.', 'X...X', 'X...X', 'XX.X.'),
  '0': pattern('.XXX.', 'X...X', 'X..XX', 'X.X.X', 'XX..X', 'X...X', '.XXX.'),
  '1': pattern('..X..', '.XX..', '..X..', '..X..', '..X..', '..X..', '.XXX.'),
  '2': pattern('.XXX.', 'X...X', '....X', '..XX.', '.X...', 'X....', 'XXXXX'),
  '3': pattern('XXXX.', '....X', '....X', '.XXX.', '....X', '....X', 'XXXX.'),
  '4': pattern('...X.', '..XX.', '.X.X.', 'X..X.', 'XXXXX', '...X.', '...X.'),
  '5': pattern('XXXXX', 'X....', 'XXXX.', '....X', '....X', 'X...X', '.XXX.'),
  '6': pattern('.XXX.', 'X....', 'X....', 'XXXX.', 'X...X', 'X...X', '.XXX.'),
  '7': pattern('XXXXX', '....X', '...X.', '..X..', '.X...', '.X...', '.X...'),
  '8': pattern('.XXX.', 'X...X', 'X...X', '.XXX.', 'X...X', 'X...X', '.XXX.'),
  '9': pattern('.XXX.', 'X...X', 'X...X', '.XXXX', '....X', '....X', '.XXX.'),
};

export const PUNCTUATION_PATTERNS: Readonly<Record<string, LetterPattern>> = {
  '!': pattern('..X..', '..X..', '..X..', '..X..', '.....', '..X..', '..X..'),
  '?': pattern('.XXX.', 'X...X', '....X', '..XX.', '..X..', '.....', '..X..'),
  '.': pattern('.....', '.....', '.....', '.....', '.....', '..X..', '..X..'),
  ',': pattern('.....', '.....', '.....', '.....', '.....', '..X..', '.X...'),
  '-': pattern('.....', '.....', '.....', 'XXXXX', '.....', '.....', '.....'),
  ':': pattern('.....', '..X..', '..X..', '.....', '..X..', '..X..', '.....'),
  "'": pattern('..X..', '..X..', '.X...', '.....', '.....', '.....', '.....'),
};
