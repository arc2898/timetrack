import { describe, expect, it } from 'vitest';
import { formatDuration, formatDurationHours } from './store.js';

describe('duration formatting', () => {
  it('formats sub-minute durations with seconds', () => {
    expect(formatDuration(12_000)).toBe('12s');
  });

  it('formats durations with hours and remaining minutes', () => {
    expect(formatDuration(3_726_000)).toBe('1h 2m');
  });

  it('formats decimal hours with two digits', () => {
    expect(formatDurationHours(5_400_000)).toBe('1.50');
  });
});
