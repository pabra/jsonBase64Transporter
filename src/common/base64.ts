import type { Opaque, TaggedTuple } from './types';
import { isTaggedTuple } from './utils';

export const base64Symbol = Symbol('base64');

export type Base64String = Opaque<string, 'Base64String'>;

export type Base64 = Opaque<
  TaggedTuple<Base64String, typeof base64Symbol>,
  'Base64'
>;

const base64PaddingRe = /=*$/;

export function trimB64(b64: Base64String): Base64String {
  return b64.replace(base64PaddingRe, '') as Base64String;
}

export function toValue(b64: Base64): string {
  return b64[1];
}

export function isBase64(data: unknown): data is Base64 {
  if (!isTaggedTuple(data)) {
    return false;
  }

  if (data[0] !== base64Symbol) {
    return false;
  }

  return true;
}
