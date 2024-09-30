declare const dispatch: <T extends "app:up" | "cache:connection:established" | "event:registration:successful" = "app:up" | "cache:connection:established" | "event:registration:successful">(event: T, ...values: {
    "app:up": [];
    "cache:connection:established": [];
    "event:registration:successful": [];
}[T]) => Promise<void>;
export { dispatch };
