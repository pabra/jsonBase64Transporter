import type { Opaque, TupleType } from './types';
import { ensureError, isTuple2 } from './utils';

const jsonSymbol = Symbol('json');
const jsonErrorSymbol = Symbol('json-error');

type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonAny[];
type JsonObject = { [key: string]: JsonAny };
export type JsonAny = JsonPrimitive | JsonArray | JsonObject;

export type JsonStringified = Opaque<string, 'JsonStringified'>;

export type Json = TupleType<JsonStringified, typeof jsonSymbol>;
export type JsonError = TupleType<Error, typeof jsonErrorSymbol>;

export function fromData(data: JsonAny): Json | JsonError {
  try {
    return [jsonSymbol, JSON.stringify(data) as JsonStringified];
  } catch (err: unknown) {
    return [jsonErrorSymbol, ensureError(err)];
  }
}

export function toData(json: Json): JsonAny | JsonError {
  try {
    return JSON.parse(json[1]) as JsonAny;
  } catch (err: unknown) {
    return [jsonErrorSymbol, ensureError(err)];
  }
}

export function toValue(json: Json): JsonStringified {
  return json[1];
}

export function isJson(data: unknown): data is Json {
  if (!isTuple2(data)) {
    return false;
  }

  if (data[0] !== jsonSymbol) {
    return false;
  }

  return true;
}

export function isJsonError(data: unknown): data is JsonError {
  if (!isTuple2(data)) {
    return false;
  }

  if (data[0] !== jsonErrorSymbol) {
    return false;
  }

  return true;
}
