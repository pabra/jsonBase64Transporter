/* eslint-env node */
/**
 * @jest-environment node
 */

import type { Base64, Base64String } from '../common/base64';
import { assertIsNode, isTestMode } from '../common/utils';

export { fromArrayBuffer, fromText, isBase64, load } from '../common/base64';
export type { Base64, Base64String } from '../common/base64';

export function toValue(b64: Base64): Base64String {
  if (b64[1] === null) {
    if (b64[2] === null) {
      (b64 as any)[2] = Buffer.from(b64[3]);
    }
    const b64Str = Buffer.from(b64[2]).toString('base64') as Base64String;
    (b64 as any)[1] = b64Str;
  }

  return b64[1];
}

export function toArrayBuffer(b64: Base64): ArrayBuffer {
  if (b64[2] === null) {
    if (b64[1] === null) {
      (b64 as any)[2] = Buffer.from(b64[3]);
    } else {
      const buf = Buffer.from(b64[1], 'base64');
      (b64 as any)[2] = buf;
    }
  }

  return b64[2];
}

export function toText(b64: Base64): string {
  if (b64[3] === null) {
    (b64 as any)[3] = Buffer.from(toArrayBuffer(b64)).toString();
  }

  return b64[3];
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
