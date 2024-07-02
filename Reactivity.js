import {BunIO, ConsoleColors, print} from "./IO";
import {Observable, useState} from "./Observable";

const observable = Observable
    .create(0)
    .observe((oldValue, newValue) => {
        print(`value changed from ${oldValue} to ${newValue}`);
    });

observable.value = 10;
observable.value = 20;


// use state
const [value, setValue] = useState(0)
print(value(), ConsoleColors.red)
setValue(10)
print(value())


// simulate vue reactive value
const ref = (value, tracker) => {
    return new Proxy({ value }, {
        set(target, prop, value, receiver) {
            tracker(receiver.value, value)
            target[prop] = value
            return true;
        },
        get(target, prop) {
            return target[prop]
        }
    })
}

const age = ref(0, (oldValue, newValue)=> {
    print(`value of 'age' updated from ${oldValue} to ${newValue} `)
})

age.value = 10;

await BunIO.readInputLoop("Enter a new value: ", output => {
    age.value = output
})















