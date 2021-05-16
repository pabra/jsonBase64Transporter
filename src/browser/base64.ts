/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Base64, Base64String } from '../common/base64';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { fromArrayBuffer, fromText, isBase64, load } from '../common/base64';
export type { Base64, Base64String } from '../common/base64';

function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(
    null,
    new Uint8Array(buf) as unknown as number[],
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

function base64StringFromText(b64: Base64) {
  return btoa(ab2str(new TextEncoder().encode(b64[3])));
}

export function toValue(b64: Base64): Base64String {
  if (b64[1] === null) {
    if (b64[2] === null) {
      (b64 as any)[1] = base64StringFromText(b64);
    } else {
      const binStr = ab2str(b64[2]);
      const b64Str = btoa(binStr) as Base64String;
      (b64 as any)[1] = b64Str;
    }
  }

  return b64[1];
}

export function toArrayBuffer(b64: Base64): ArrayBuffer {
  if (b64[2] === null) {
    if (b64[1] === null) {
      (b64 as any)[1] = base64StringFromText(b64);
    }
    const binStr = atob(b64[1]);
    const buf = str2ab(binStr);
    (b64 as any)[2] = buf;
  }

  return b64[2];
}

export function toText(b64: Base64): string {
  if (b64[3] === null) {
    (b64 as any)[3] = new TextDecoder().decode(toArrayBuffer(b64));
  }

  return b64[3];
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
