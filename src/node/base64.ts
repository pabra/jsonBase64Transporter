/* eslint-env node */
/**
 * @jest-environment node
 */

import type { Base64, Base64String } from '../common/base64';
import { base64Symbol } from '../common/base64';
import { assertIsNode, isTestMode } from '../common/utils';

export { isBase64 } from '../common/base64';
export type { Base64, Base64String } from '../common/base64';

export function load(b64: string): Base64 {
  return [base64Symbol, b64, null] as unknown as Base64;
}

export function fromArrayBuffer(buf: ArrayBuffer): Base64 {
  return [base64Symbol, null, buf] as unknown as Base64;
}

export function toValue(b64: Base64): Base64String {
  if (b64[1] === null) {
    const b64Str = Buffer.from(b64[2]).toString('base64') as Base64String;
    (b64 as any)[1] = b64Str;
  }

  return b64[1];
}

export function toArrayBuffer(b64: Base64): ArrayBuffer {
  if (b64[2] === null) {
    const raw = toValue(b64);
    const buf = Buffer.from(raw, 'base64');
    (b64 as any)[2] = buf;
  }

  return b64[2];
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
