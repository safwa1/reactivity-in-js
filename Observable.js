export class Observable {

    #observerCallbacks = []

    constructor(value) {
        this._value = value;
    }

    observe(callback) {
        this.#observerCallbacks.push(callback);
        return this
    }

    #subscribe(currentValue, newValue) {
        this.#observerCallbacks.forEach(fn => {
            fn(currentValue, newValue)
        })
    }

    #setValue(newValue) {
        const current = this._value;
        this._value = newValue;
        // emit changes
        this.#subscribe(current, newValue)
    }

    // method | function
    getValue() {
        return this._value
    }

    // accessor
    set value(newValue) {
        this.#setValue(newValue)
    }

    get value() {
        return this.getValue()
    }

    static create(value) {
        return new Observable(value)
    }
}

export const useState = (value) => {
    const observable = Observable.create(value)
    const mutator = (newValue) => observable.value = newValue
    const accessor = observable.getValue.bind(observable)

    return [
        accessor,
        mutator
    ]
}