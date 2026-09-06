import { describe, expect, it } from 'vitest';
import { assertNoActiveSession, formatDuration, formatDurationHours } from './store.js';

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

  it('formats zero duration consistently', () => {
    expect(formatDuration(0)).toBe('0s');
    expect(formatDurationHours(0)).toBe('0.00');
  });

  it('rejects starting over an active session', () => {
    expect(() => assertNoActiveSession({
      id: 'tt_test', project: 'existing', tag: 'work', note: '',
      startTime: 0, endTime: null, duration: null,
    })).toThrow('An active session already exists for project: existing');
  });
});
