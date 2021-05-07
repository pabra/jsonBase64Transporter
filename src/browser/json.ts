/* eslint-env browser */
/**
 * @jest-environment jsdom
 */

import type { Json } from '../common/json';
import { toValue } from '../common/json';
import { assertIsBrowser, isTestMode } from '../common/utils';

export { fromData, isJson, toData, toValue } from '../common/json';
export type { Json, JsonStringified } from '../common/json';
export type { JsonValue } from '../common/types';

export function toArrayBuffer(json: Json): ArrayBuffer {
  if (json[3] === null) {
    (json as any)[3] = new TextEncoder().encode(toValue(json));
  }

  return json[3];
}

export function assertRightEnvironment(): void {
  assertIsBrowser();
}

if (!isTestMode()) {
  assertIsBrowser();
}
