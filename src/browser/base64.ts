/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Base64, Base64Error, Base64String } from '../common/base64';
import {
  base64ErrorSymbol,
  base64Symbol,
  toValue,
  trimB64,
} from '../common/base64';
import { assertIsBrowser, ensureError, isTestMode } from '../common/utils';

export { isBase64, isBase64Error, toValue } from '../common/base64';
export type { Base64, Base64Error, Base64String } from '../common/base64';

function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(
    null,
    (new Uint8Array(buf) as unknown) as number[],
  );
}

function str2ab(str: string): ArrayBuffer {
  const strLen = str.length;
  const buf = new ArrayBuffer(strLen);
  const bufView = new Uint8Array(buf);

  for (let i = 0; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
}

export function fromArrayBuffer(
  buf: ArrayBuffer,
  trim = true,
): Base64 | Base64Error {
  try {
    const binStr = ab2str(buf);
    const b64 = btoa(binStr) as Base64String;
    const maybeTrimmed = trim ? trimB64(b64) : b64;

    return [base64Symbol, maybeTrimmed];
  } catch (err: unknown) {
    return [base64ErrorSymbol, ensureError(err)];
  }
}

export function toArrayBuffer(b64: Base64): ArrayBuffer | Base64Error {
  try {
    const binStr = atob(toValue(b64));
    const buf = str2ab(binStr);

    return buf;
  } catch (err: unknown) {
    return [base64ErrorSymbol, ensureError(err)];
  }
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
