import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export class FileCache<T> {
    private filePath: string;

    constructor(fileName: string) {
        this.filePath = path.resolve(__dirname, '../../cache', fileName);

        // Ensure cache folder exists
        if (!fs.existsSync(path.dirname(this.filePath))) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
            console.log(chalk.green(`[CACHE] Created cache directory at ${path.dirname(this.filePath)}`));
        }
    }

    // Read cached data from file
    public read(): T | null {
        if (!fs.existsSync(this.filePath)) {
            console.log(chalk.yellow(`[CACHE] Cache miss (file not found): ${this.filePath}`));
            return null;
        }

        try {
            const raw = fs.readFileSync(this.filePath, 'utf-8');
            
            console.log(chalk.green(`[CACHE] Cache hit: ${this.filePath}`));
            return JSON.parse(raw) as T;
        } catch (error: any) {
            console.log(chalk.red(`[CACHE] Failed to read cache: ${error.message}`));
            return null;
        }
    }

    // Write data to cache
    public write(data: T): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log(chalk.green(`[CACHE] Successfully wrote cache: ${this.filePath}`));
        } catch (error: any) {
            console.log(chalk.red(`[CACHE] Failed to write cache: ${error.message}`));
        }
    }
}