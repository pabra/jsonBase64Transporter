import type { JsonValue, Opaque, TaggedQuadruple } from './types';
import { isTaggedArray } from './utils';

const jsonSymbol = Symbol('json');

export type JsonStringified = Opaque<string, 'JsonStringified'>;

export type Json = TaggedQuadruple<
  JsonStringified,
  JsonValue,
  ArrayBuffer,
  typeof jsonSymbol
> & {
  _type: 'Json';
};

export function fromData(data: JsonValue): Json {
  return ([
    jsonSymbol,
    JSON.stringify(data) as JsonStringified,
    data,
    null, // ArrayBuffer
  ] as unknown) as Json;
}

export function toData(json: Json): JsonValue {
  return json[2];
}

export function toValue(json: Json): JsonStringified {
  return json[1];
}

export function isJson(data: unknown): data is Json {
  if (!isTaggedArray(data, 'quadruple')) {
    return false;
  }

  if (data[0] !== jsonSymbol) {
    return false;
  }

  return true;
}
