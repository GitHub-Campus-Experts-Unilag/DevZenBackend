import { EventEmitter2 as Event } from "eventemitter2";

import { EventListenerMap, Listener } from "../../core";
import { register } from "./events-registry";
import { eventKeys, AppEventListenerMap } from "./helper.types";

class AppEventManager extends Event {
  constructor(eventListenerMap: EventListenerMap) {
    super();
    this.register(eventListenerMap).then(() =>
      this.dispatch("event:registration:successful"),
    );
  }

  private register = async (
    eventListenerMap: EventListenerMap,
  ): Promise<void> => {
    Object.keys(eventListenerMap).forEach((event: string) => {
      const listeners: Listener[] | Listener = eventListenerMap[event];

      if (Array.isArray(listeners)) {
        listeners.forEach((listener: Listener) => {
          this.on(event, listener);
        });
      } else {
        this.on(event, listeners);
      }
    });
  };

  public dispatch = async <T extends eventKeys = eventKeys>(
    event: T,
    ...values: AppEventListenerMap[T]
  ): Promise<void> => {
    this.emit(event, ...values);
  };
}

const { dispatch } = new AppEventManager(register);
export { dispatch };
