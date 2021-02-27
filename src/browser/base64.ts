/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Base64, Base64String } from '../common/base64';
import { base64Symbol, toValue, trimB64 } from '../common/base64';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { isBase64, toValue } from '../common/base64';
export type { Base64, Base64String } from '../common/base64';

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

export function fromArrayBuffer(buf: ArrayBuffer, trim = true): Base64 {
  const binStr = ab2str(buf);
  const b64 = btoa(binStr) as Base64String;
  const maybeTrimmed = trim ? trimB64(b64) : b64;

  return ([base64Symbol, maybeTrimmed] as unknown) as Base64;
}

export function toArrayBuffer(b64: Base64): ArrayBuffer {
  const binStr = atob(toValue(b64));
  const buf = str2ab(binStr);

  return buf;
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
