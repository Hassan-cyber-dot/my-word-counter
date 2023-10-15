import * as readline from 'readline';
class WordCounter {
    startTime;
    endTime;
    wordCount;
    rl;
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.wordCount = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    start() {
        this.startTime = Date.now();
        this.endTime = this.startTime + 10000;
        console.log('Start typing...');
        this.rl.on('line', (input) => {
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
    countWords(input) {
        return input.trim().split(/\s+/).length;
    }
}
const wordCounter = new WordCounter();
wordCounter.start();
