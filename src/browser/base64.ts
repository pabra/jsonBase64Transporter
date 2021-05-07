/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Base64, Base64String } from '../common/base64';
import { base64Symbol, trimB64 } from '../common/base64';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { isBase64 } from '../common/base64';
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

export function load(b64: string): Base64 {
  return ([base64Symbol, b64, null] as unknown) as Base64;
}

export function fromArrayBuffer(buf: ArrayBuffer): Base64 {
  return ([base64Symbol, null, buf] as unknown) as Base64;
}

export function toValue(b64: Base64): Base64String {
  if (b64[1] === null) {
    const binStr = ab2str(b64[2]);
    const b64Str = trimB64(btoa(binStr) as Base64String);
    (b64 as any)[1] = b64Str;
  }

  return b64[1];
}

export function toArrayBuffer(b64: Base64): ArrayBuffer {
  if (b64[2] === null) {
    const raw = toValue(b64);
    const binStr = atob(raw);
    const buf = str2ab(binStr);
    (b64 as any)[2] = buf;
  }

  return b64[2];
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
