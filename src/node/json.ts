/* eslint-env node */
/**
 * @jest-environment node
 */

import type { Json } from '../common/json';
import { toRaw } from '../common/json';
import { assertIsNode, isTestMode } from '../common/utils';

export { fromData, isJson, isJsonError, toData, toRaw } from '../common/json';
export type { Json, JsonAny, JsonError, JsonStringified } from '../common/json';

export function toArrayBuffer(json: Json): ArrayBuffer {
  return Buffer.from(toRaw(json), 'utf8');
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
