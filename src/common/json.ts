import type { JsonValue, Opaque, TaggedTuple } from './types';
import { isTaggedTuple } from './utils';

const jsonSymbol = Symbol('json');

export type JsonStringified = Opaque<string, 'JsonStringified'>;

export type Json = TaggedTuple<JsonStringified, typeof jsonSymbol> & {
  _type: 'Json';
};

export function fromData(data: JsonValue): Json {
  return ([
    jsonSymbol,
    JSON.stringify(data) as JsonStringified,
  ] as unknown) as Json;
}

export function toData(json: Json): JsonValue {
  return JSON.parse(json[1]);
}

export function toValue(json: Json): JsonStringified {
  return json[1];
}

export function isJson(data: unknown): data is Json {
  if (!isTaggedTuple(data)) {
    return false;
  }

  if (data[0] !== jsonSymbol) {
    return false;
  }

  return true;
}
