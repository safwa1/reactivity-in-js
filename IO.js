export class IO {
    static #readline = require('node:readline');

    static readLine(message, handler) {
        const {stdin: input, stdout: output} = require('node:process');
        const instance = this.#readline.createInterface({input, output})
        instance.question(`${message}`, (answer) => {
            handler?.(answer)
            instance.close()
        });
    }
}

export class BunIO {
    static async readInputLoop(prompt, handler, options = {oneTime: false}) {
        process.stdout.write(prompt);
        for await (const line of console) {
            handler?.(line)
            if (options.oneTime) break;
            process.stdout.write(prompt);
        }
    }
}

export const ConsoleColors = Object.freeze({
    reset: '\x1b[0m',
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    purple: '\x1b[35m',
    heavenly: '\x1b[36m',
    white: '\x1b[37m',
})

const log = (value, color) => console.log(`${color}${value} ${ConsoleColors.reset}`);

export const print = (value, color = ConsoleColors.green) => {
    log(value, color)
}

export const println = (value, color = ConsoleColors.green) => {
    log(`${value}\n`, color)
}









/*
vue reactive prop method
function ref(value) {
    return new Proxy({ value }, {
        get(target, key) {
            if (key === 'value') {
                // Track dependency
                track(target, key);
                return target[key];
            }
            // Handle other property accesses if needed
            return target[key];
        },
        set(target, key, newValue) {
            if (key === 'value') {
                target[key] = newValue;
                // Trigger effect
                trigger(target, key);
                return true;
            }
            // Handle other property sets if needed
            return false;
        }
    });
}

// Example implementation of track and trigger
function track(target, key) {
    console.log(`Tracking ${key} on`, target);
    // Add logic to track the dependency
}

function trigger(target, key) {
    console.log(`Triggering ${key} on`, target);
    // Add logic to trigger the effect
}

// Usage example
const state = ref(10);
console.log(state.value); // Should track the value
state.value = 20;         // Should trigger the effect
*/