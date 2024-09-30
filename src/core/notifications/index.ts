export abstract class Notification {
  abstract handle(...args: any[]): void | Promise<void>;
}
