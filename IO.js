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
