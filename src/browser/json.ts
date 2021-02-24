/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Json } from '../common/json';
import { toValue } from '../common/json';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { fromData, isJson, isJsonError, toData, toValue } from '../common/json';
export type { Json, JsonAny, JsonError, JsonStringified } from '../common/json';

export function toArrayBuffer(json: Json): ArrayBuffer {
  return new TextEncoder().encode(toValue(json));
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
