class EventBus {
    constructor() {
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        EventBus.__instance = this;
        this.listeners = {};
    }

    on(event, callback) {
        this.listeners[event] = this.listeners[event] ? this.listeners[event] : [];
        this.listeners[event].push(callback);

        return this;
    }

    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
        }

        return this;
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => listener(data));
        }

        return this;
    }
}

export default new EventBus();
