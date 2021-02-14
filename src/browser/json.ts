/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Json } from '../common/json';
import { toRaw } from '../common/json';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { fromData, isJson, isJsonError, toData, toRaw } from '../common/json';
export type { Json, JsonAny, JsonError, JsonStringified } from '../common/json';

export function toArrayBuffer(json: Json): ArrayBuffer {
  return new TextEncoder().encode(toRaw(json));
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
