export type TupleType<T, S extends symbol> = Readonly<[symbol, T]> &
  Readonly<[S, T]>;

export type Opaque<Type, Token = unknown> = Type & {
  readonly __opaque__: Token;
};
