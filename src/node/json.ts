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
  if (json[3] === null) {
    (json as any)[3] = Buffer.from(toValue(json), 'utf8');
  }

  return json[3];
}

export function assertRightEnvironment(): void {
  assertIsNode();
}

if (!isTestMode()) {
  assertIsNode();
}
