import { afterEach,expect,it,vi } from 'vitest';
import {checkRateLimit,clearAllRateLimits,LOGIN_RATE_LIMIT,resetRateLimit} from './rate-limit';
afterEach(() => {clearAllRateLimits(); vi.useRealTimers();});
it('blocks the sixth login independently for each client',() => {
 for(let i=0;i<5;i++) expect(checkRateLimit('a',LOGIN_RATE_LIMIT)).toBe(true);
 expect(checkRateLimit('a',LOGIN_RATE_LIMIT)).toBe(false); expect(checkRateLimit('b',LOGIN_RATE_LIMIT)).toBe(true);
});
it('allows requests after expiration',() => {
 vi.useFakeTimers(); for(let i=0;i<5;i++) checkRateLimit('a',LOGIN_RATE_LIMIT);
 vi.advanceTimersByTime(LOGIN_RATE_LIMIT.windowMs+1); expect(checkRateLimit('a',LOGIN_RATE_LIMIT)).toBe(true);
});
it('resets only the selected client',() => {
 for(let i=0;i<5;i++){checkRateLimit('a',LOGIN_RATE_LIMIT);checkRateLimit('b',LOGIN_RATE_LIMIT);}
 resetRateLimit('a'); expect(checkRateLimit('a',LOGIN_RATE_LIMIT)).toBe(true);expect(checkRateLimit('b',LOGIN_RATE_LIMIT)).toBe(false);
});
