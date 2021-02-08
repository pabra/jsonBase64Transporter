/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

export { fromData, isJson, isJsonError, toData, toRaw } from './json.common';
export type { Json, JsonAny, JsonError, JsonStringified } from './json.common';
import type { Json } from './json.common';
import { toRaw } from './json.common';

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
