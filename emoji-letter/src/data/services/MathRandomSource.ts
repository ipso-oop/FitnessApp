import type { RandomSource } from '../../domain/services/RandomSource';

export class MathRandomSource implements RandomSource {
  nextInt(maxExclusive: number): number {
    if (maxExclusive <= 0) {
      throw new Error('maxExclusive must be greater than 0.');
    }

    return Math.floor(Math.random() * maxExclusive);
  }
}

export class SequenceRandomSource implements RandomSource {
  private index = 0;

  constructor(private readonly values: readonly number[]) {}

  nextInt(maxExclusive: number): number {
    if (maxExclusive <= 0) {
      throw new Error('maxExclusive must be greater than 0.');
    }

    const value = this.values[this.index % this.values.length] ?? 0;
    this.index += 1;
    return value % maxExclusive;
  }
}
