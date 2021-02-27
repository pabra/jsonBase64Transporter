/* eslint-env node */
/**
 * @jest-environment node
 */

import type { Json } from '../common/json';
import { toValue } from '../common/json';
import { assertIsNode, isTestMode } from '../common/utils';

export { fromData, isJson, toData, toValue } from '../common/json';
export type { Json, JsonStringified } from '../common/json';
export type { JsonValue } from '../common/types';

export function toArrayBuffer(json: Json): ArrayBuffer {
  return Buffer.from(toValue(json), 'utf8');
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
