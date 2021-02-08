/* eslint-env node */
/**
 * @jest-environment node
 */

export { fromData, isJson, isJsonError, toData, toRaw } from './json.common';
export type { Json, JsonAny, JsonError, JsonStringified } from './json.common';
import type { Json } from './json.common';
import { toRaw } from './json.common';

if (typeof Buffer === 'undefined') {
  throw new Error('there is no Buffer');
}

export function toArrayBuffer(json: Json): ArrayBuffer {
  return Buffer.from(toRaw(json), 'utf8');
}
