import type { Opaque, TaggedQuadruple } from './types';
import { isTaggedArray } from './utils';

const base64Symbol = Symbol('base64');

export type Base64String = Opaque<string, 'Base64String'>;

export type Base64 = TaggedQuadruple<
  Base64String,
  ArrayBuffer,
  string,
  typeof base64Symbol
> & {
  _type: 'Base64';
};

export function load(b64: string): Base64 {
  return [base64Symbol, b64, null, null] as unknown as Base64;
}

export function fromArrayBuffer(buf: ArrayBuffer): Base64 {
  return [base64Symbol, null, buf, null] as unknown as Base64;
}

export function fromText(text: string): Base64 {
  return [base64Symbol, null, null, text] as unknown as Base64;
}

export function isBase64(data: unknown): data is Base64 {
  if (!isTaggedArray(data)) {
    return false;
  }

  if (data[0] !== base64Symbol) {
    return false;
  }

  return true;
}
