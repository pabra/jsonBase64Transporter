/* eslint-env node */
/**
 * @jest-environment node
 */

import type { Base64, Base64String } from '../common/base64';
import { base64Symbol, toValue, trimB64 } from '../common/base64';
import { assertIsNode, isTestMode } from '../common/utils';

export { isBase64, toValue } from '../common/base64';
export type { Base64, Base64String } from '../common/base64';

export function load(b64: string): Base64 {
  return ([base64Symbol, b64] as unknown) as Base64;
}

export function fromArrayBuffer(buf: ArrayBuffer, trim = true): Base64 {
  const b64 = Buffer.from(buf).toString('base64') as Base64String;
  const maybeTrimmed = trim ? trimB64(b64) : b64;

  return ([base64Symbol, maybeTrimmed] as unknown) as Base64;
}

export function toArrayBuffer(b64: Base64): ArrayBuffer {
  const raw = toValue(b64);
  const buf = Buffer.from(raw, 'base64');

  return buf;
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
