export const ActiveEvents: Record<string, (source: number, ...args: Array<T>) => void> = {};
export const ActiveGETEvents: Record<string, (...args: Array<T>) => void> = {};

