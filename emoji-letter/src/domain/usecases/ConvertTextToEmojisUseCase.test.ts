import { ConversionModes } from '../entities/conversionMode';
import { toOutputString } from '../entities/conversionResult';
import { GlyphKinds } from '../entities/glyph';
import { SequenceRandomSource } from '../../data/services/MathRandomSource';
import { ConvertTextToEmojisUseCase } from './ConvertTextToEmojisUseCase';
import {
  createTestCatalog,
  createTestFont,
  createTestSettings,
  mappingFor,
} from '../test/fixtures';

function createUseCase(sequence: number[] = [0, 1, 2, 0]) {
  const catalog = createTestCatalog();
  return {
    catalog,
    useCase: new ConvertTextToEmojisUseCase(
      catalog,
      new SequenceRandomSource(sequence),
      createTestFont(),
    ),
  };
}

function filledGlyphs(result: ReturnType<ConvertTextToEmojisUseCase['execute']>) {
  return result.glyphs.map((glyph) =>
    glyph.pixels.flat().filter((pixel) => pixel.filled).map((pixel) => pixel.emoji?.glyph),
  );
}

describe('ConvertTextToEmojisUseCase', () => {
  it('returns an empty glyph list for empty text', () => {
    const { catalog, useCase } = createUseCase();
    const result = useCase.execute('', createTestSettings(catalog));
    expect(result.glyphs).toEqual([]);
    expect(result.sourceText).toBe('');
  });

  it('draws each letter as a pixel pattern with the mapped emoji', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.PerLetter,
      letterMappings: mappingFor(catalog, {
        h: 'heart',
        a: 'star',
        l: 'fire',
        o: 'heart',
      }),
    });

    const result = useCase.execute('Hallo', settings);

    expect(result.glyphs.every((glyph) => glyph.kind === GlyphKinds.Letter)).toBe(
      true,
    );
    expect(filledGlyphs(result)).toEqual([
      ['❤️', '❤️'],
      ['⭐', '⭐'],
      ['🔥', '🔥'],
      ['🔥', '🔥'],
      ['❤️', '❤️'],
    ]);
    expect(result.glyphs[0]?.pixels).toEqual([
      [
        expect.objectContaining({ filled: true, emoji: catalog.getById('heart') }),
        expect.objectContaining({ filled: false, emoji: null }),
      ],
      [
        expect.objectContaining({ filled: false, emoji: null }),
        expect.objectContaining({ filled: true, emoji: catalog.getById('heart') }),
      ],
    ]);
  });

  it('uses one global emoji as ink for every letter', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Global,
      globalEmoji: catalog.getById('fire')!,
    });

    const result = useCase.execute('Hi', settings);

    expect(filledGlyphs(result)).toEqual([
      ['🔥', '🔥'],
      ['🔥', '🔥'],
    ]);
  });

  it('paints each filled pixel with a random emoji', () => {
    const { catalog, useCase } = createUseCase([0, 1, 2, 0]);
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Random,
    });

    const result = useCase.execute('ab', settings);

    expect(filledGlyphs(result)).toEqual([
      ['⭐', '❤️'],
      ['🔥', '⭐'],
    ]);
  });

  it('keeps spaces, newlines, and unknown characters', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Global,
      globalEmoji: catalog.getById('star')!,
    });

    const result = useCase.execute('A B\n#', settings);

    expect(result.glyphs.map((glyph) => glyph.kind)).toEqual([
      GlyphKinds.Letter,
      GlyphKinds.Space,
      GlyphKinds.Letter,
      GlyphKinds.Newline,
      GlyphKinds.Passthrough,
    ]);
    expect(result.lines).toHaveLength(2);
    expect(result.glyphs[4]?.source).toBe('#');
  });

  it('renders copyable multi-line emoji letter art', () => {
    const { catalog, useCase } = createUseCase();
    const settings = createTestSettings(catalog, {
      mode: ConversionModes.Global,
      globalEmoji: catalog.getById('star')!,
    });

    const output = toOutputString(useCase.execute('A', settings));

    expect(output).toBe('⭐  \n  ⭐');
  });
});
