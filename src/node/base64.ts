/* eslint-env node */
/**
 * @jest-environment node
 */

import type { Base64, Base64Error, Base64String } from '../common/base64';
import {
  base64ErrorSymbol,
  base64Symbol,
  toValue,
  trimB64,
} from '../common/base64';
import { assertIsNode, ensureError, isTestMode } from '../common/utils';

export { isBase64, isBase64Error, toValue } from '../common/base64';
export type { Base64, Base64Error, Base64String } from '../common/base64';

export function fromArrayBuffer(
  buf: ArrayBuffer,
  trim = true,
): Base64 | Base64Error {
  try {
    const b64 = Buffer.from(buf).toString('base64') as Base64String;
    const maybeTrimmed = trim ? trimB64(b64) : b64;

    return [base64Symbol, maybeTrimmed];
  } catch (err: unknown) {
    return [base64ErrorSymbol, ensureError(err)];
  }
}

export function toArrayBuffer(b64: Base64): ArrayBuffer | Base64Error {
  try {
    const raw = toValue(b64);
    const buf = Buffer.from(raw, 'base64');

    return buf;
  } catch (err: unknown) {
    return [base64ErrorSymbol, ensureError(err)];
  }
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
