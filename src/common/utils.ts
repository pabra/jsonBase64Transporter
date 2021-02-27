function isTestEnv(): boolean {
  return typeof process !== 'object'
    ? false
    : typeof process.env !== 'object'
    ? false
    : process.env.NODE_ENV === 'test';
}

function isKarmaTypescriptInStack(): boolean {
  const err = new Error();

  return (
    typeof err.stack === 'string' &&
    err.stack.includes('node_modules/karma-typescript')
  );
}

export function isTestMode(): boolean {
  return isTestEnv() || isKarmaTypescriptInStack();
}

function isBrowserExclusive() {
  return typeof window === 'object';
}

export function assertIsNode(): void {
  if (isBrowserExclusive()) {
    throw new Error('looks like running in browser');
  }
}

export function assertIsBrowser(): void {
  if (!isBrowserExclusive()) {
    throw new Error('looks like running in node');
  }
}

export function isTaggedTuple(
  data: unknown,
): data is readonly [unknown, unknown] {
  if (!Array.isArray(data)) {
    return false;
  }

  if (data.length !== 2) {
    return false;
  }

  return true;
}
