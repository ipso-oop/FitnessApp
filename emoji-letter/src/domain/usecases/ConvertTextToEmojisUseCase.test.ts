import { ConversionModes } from '../entities/conversionMode';
import { GlyphKinds } from '../entities/glyph';
import { SequenceRandomSource } from '../../data/services/MathRandomSource';
import { ConvertTextToEmojisUseCase } from './ConvertTextToEmojisUseCase';
import { createTestCatalog, createTestSettings, mappingFor } from '../test/fixtures';

function createUseCase(sequence: number[] = [0, 1, 2, 0]) {
  const catalog = createTestCatalog();
  return {
    catalog,
    useCase: new ConvertTextToEmojisUseCase(
      catalog,
      new SequenceRandomSource(sequence),
    ),
  };
}

describe('ConvertTextToEmojisUseCase', () => {

  it('returns an empty glyph list for empty text', () => {
    const { catalog, useCase } = createUseCase();
    const result = useCase.execute('', createTestSettings(catalog));
    expect(result.glyphs).toEqual([]);
    expect(result.sourceText).toBe('');
  });

  it('converts letters with the per-letter mapping', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.PerLetter,
      letterMappings: mappingFor(catalog, { h: 'heart', a: 'star', l: 'fire', o: 'heart' }),
    });

    const result = useCase.execute('Hallo', settings);

    expect(result.glyphs.map((glyph) => glyph.display)).toEqual([
      '❤️',
      '⭐',
      '🔥',
      '🔥',
      '❤️',
    ]);
    expect(result.glyphs.every((glyph) => glyph.kind === GlyphKinds.Emoji)).toBe(
      true,
    );
  });

  it('uses one global emoji for every letter', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Global,
      globalEmoji: catalog.getById('fire')!,
    });

    const result = useCase.execute('Hi', settings);

    expect(result.glyphs.map((glyph) => glyph.display)).toEqual(['🔥', '🔥']);
  });

  it('picks a new random emoji for each letter', () => {
    const { catalog, useCase } = createUseCase([0, 1, 2]);
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Random,
    });

    const result = useCase.execute('abc', settings);

    expect(result.glyphs.map((glyph) => glyph.display)).toEqual(['⭐', '❤️', '🔥']);
  });

  it('keeps spaces, newlines, and punctuation', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Global,
      globalEmoji: catalog.getById('star')!,
    });

    const result = useCase.execute('A B\n!', settings);

    expect(result.glyphs.map((glyph) => glyph.kind)).toEqual([
      GlyphKinds.Emoji,
      GlyphKinds.Space,
      GlyphKinds.Emoji,
      GlyphKinds.Newline,
      GlyphKinds.Passthrough,
    ]);
    expect(result.glyphs.map((glyph) => glyph.display)).toEqual([
      '⭐',
      ' ',
      '⭐',
      '\n',
      '!',
    ]);
  });
});
