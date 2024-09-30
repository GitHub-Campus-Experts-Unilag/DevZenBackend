export type Listener = (...args: any[]) => unknown;
export type EventListenerMap = Record<string, Listener | Listener[]>;

export type ExtractParams<T> = T extends (...args: infer P) => unknown
  ? P
  : T extends Array<infer E>
  ? ExtractParams<E>
  : never;
