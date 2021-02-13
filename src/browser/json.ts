/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Json } from '../common/json';
import { toRaw } from '../common/json';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { fromData, isJson, isJsonError, toData, toRaw } from '../common/json';
export type { Json, JsonAny, JsonError, JsonStringified } from '../common/json';

function str2ab(str: string): ArrayBuffer {
  const strLen = str.length;
  const buf = new ArrayBuffer(strLen);
  const bufView = new Uint8Array(buf);

  for (let i = 0; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
}

export function toArrayBuffer(json: Json): ArrayBuffer {
  return str2ab(toRaw(json));
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
