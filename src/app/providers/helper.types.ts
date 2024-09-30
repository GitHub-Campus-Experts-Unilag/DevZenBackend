import { ExtractParams } from "../../core";
import { register } from "./events-registry";

/**
 * Events Helper types
 */
export type AppEventListenerMap = EvMapParams;
export type eventKeys = keyof typeof register;
type EvMapParams = {
  [K in keyof typeof register]: ExtractParams<(typeof register)[K]>;
};
