export type LetterPattern = Readonly<{
  width: number;
  height: number;
  cells: readonly (readonly boolean[])[];
}>;

export function parseLetterPattern(rows: readonly string[]): LetterPattern {
  if (rows.length === 0) {
    throw new Error('Letter pattern must have at least one row.');
  }

  const width = rows[0].length;
  if (width === 0) {
    throw new Error('Letter pattern rows must not be empty.');
  }

  const cells = rows.map((row) => {
    if (row.length !== width) {
      throw new Error('Letter pattern rows must have the same width.');
    }

    return Object.freeze(
      [...row].map((cell) => cell === 'X' || cell === '1'),
    );
  });

  return Object.freeze({
    width,
    height: rows.length,
    cells: Object.freeze(cells),
  });
}

export function countFilledCells(pattern: LetterPattern): number {
  return pattern.cells.reduce(
    (total, row) => total + row.filter(Boolean).length,
    0,
  );
}
