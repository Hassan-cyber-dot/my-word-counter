
import * as inquirer from 'inquirer';
import * as readline from 'readline';
import * as fs from 'fs';

class WordCounter {
    private startTime: number;
    private endTime: number;
    private wordCount: number;
    private rl: readline.Interface;

    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.wordCount = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public start(): void {
        this.startTime = Date.now();
        this.endTime = this.startTime + 10000;
        console.log('Start typing...');
        this.rl.on('line', (input: string) => {
            this.wordCount += this.countWords(input);
            if (Date.now() >= this.endTime) {
                this.rl.close();
            }
        });
        this.rl.on('close', () => {
            console.log(`You typed ${this.wordCount} words in 10 seconds.`);
            process.exit(0);
        });
    }

    private countWords(input: string): number {
        return input.trim().split(/\s+/).length;
    }
}

const wordCounter = new WordCounter();
wordCounter.start();
