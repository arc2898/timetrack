import { describe, expect, it } from 'vitest';
import { csvCell } from './export.js';

describe('csvCell', () => {
  it('quotes fields containing CSV delimiters or line breaks', () => {
    expect(csvCell('Project, one')).toBe('"Project, one"');
    expect(csvCell('say "hello"')).toBe('"say ""hello"""');
    expect(csvCell('line one\nline two')).toBe('"line one\nline two"');
  });

  it('keeps simple values and nulls readable', () => {
    expect(csvCell('plain')).toBe('plain');
    expect(csvCell(42)).toBe('42');
    expect(csvCell(null)).toBe('');
  });
});
