import type { Opaque, TupleType } from './types';
import { isTuple2 } from './utils';

export const base64Symbol = Symbol('base64');
export const base64ErrorSymbol = Symbol('base64-error');

export type Base64String = Opaque<string, 'Base64String'>;

export type Base64 = TupleType<Base64String, typeof base64Symbol>;
export type Base64Error = TupleType<Error, typeof base64ErrorSymbol>;

const base64PaddingRe = /=*$/;

export function trimB64(b64: Base64String): Base64String {
  return b64.replace(base64PaddingRe, '') as Base64String;
}

export function toRaw(b64: Base64): string {
  return b64[1];
}

export function isBase64(data: unknown): data is Base64 {
  if (!isTuple2(data)) {
    return false;
  }

  if (data[0] !== base64Symbol) {
    return false;
  }

  return true;
}

export function isBase64Error(data: unknown): data is Base64Error {
  if (!isTuple2(data)) {
    return false;
  }

  if (data[0] !== base64ErrorSymbol) {
    return false;
  }

  return true;
}
