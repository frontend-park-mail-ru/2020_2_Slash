import eventBus from '../services/EventBus';

function func1() {
    return;
}

function func2() {
    return;
}

function func3() {
    return;
}

afterEach(() => {
    eventBus.off('event', func1);
    eventBus.off('event', func2);
    eventBus.off('event', func3);
});

test('test EventBus.on 2', () => {
    eventBus.on('event', func1);
    eventBus.on('event', func2);
    expect(eventBus.getListeners()).toEqual({'event': [func1, func2]});
});

test('test EventBus.on 3', () => {
    eventBus.on('event', func1);
    eventBus.on('event', func2);
    eventBus.on('event', func3);
    expect(eventBus.getListeners()).toEqual({'event': [func1, func2, func3]});
});

test('test EventBus.off', () => {
    eventBus.on('event', func1);
    eventBus.on('event', func2);
    eventBus.off('event', func1);
    expect(eventBus.getListeners()).toEqual({'event': [func2]});
});

test('test EventBus.off', () => {
    eventBus.on('event', func1);
    eventBus.on('event', func2);
    eventBus.off('event', func1);
    eventBus.off('event', func2);
    expect(eventBus.getListeners()).toEqual({'event': []});
});

test('test EventBus.emit', () => {
    const mockCallback = jest.fn();
    eventBus.on('event', mockCallback);
    eventBus.emit('event');
    expect(mockCallback.mock.calls.length).toBe(1);
});

test('test EventBus.emit', () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    eventBus.on('event', mockCallback1);
    eventBus.on('event', mockCallback2);
    eventBus.emit('event');
    expect(mockCallback1.mock.calls.length).toBe(1);
    expect(mockCallback2.mock.calls.length).toBe(1);
});

