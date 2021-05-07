export type TaggedTriple<T, U, S extends symbol> = Readonly<[S, T, U]>;
export type TaggedQuadruple<T, U, V, S extends symbol> = Readonly<[S, T, U, V]>;

type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [Key in string]: JsonValue };
type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type Opaque<Type, Token = unknown> = Type & {
  readonly __opaque__: Token;
};
