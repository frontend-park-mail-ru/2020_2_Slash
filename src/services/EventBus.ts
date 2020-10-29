import {CustomObject} from "../tools/type";

interface Callback {
    (param: any[]): void;
}

class EventBus {
    private static instance: EventBus;
    private listeners: CustomObject;

    private constructor() {
        this.listeners = {};
    }

    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }

        return EventBus.instance;
    }

    public getListeners(): CustomObject {
        return this.listeners;
    }

    on(event: string, callback: Callback) {
        this.listeners[event] = this.listeners[event] ? this.listeners[event] : [];
        this.listeners[event].push(callback);
        return this;
    }

    off(event: string, callback: Callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
        }
        return this;
    }

    emit(event: string, data?: {}) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => listener(data));
        }
        return this;
    }
}

export default EventBus.getInstance();
