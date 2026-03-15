import fs from 'fs';
import path from 'path';

export class FileCache<T> {
    private filePath: string;

    constructor(fileName: string) {
        this.filePath = path.resolve(__dirname, '../../cache', fileName);

        // Ensure cache folder exists
        if (!fs.existsSync(path.dirname(this.filePath))) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
        }
    }

    // Read cached data from file
    public read(): T | null {
        if (!fs.existsSync(this.filePath)) return null;

        try {
            const raw = fs.readFileSync(this.filePath, 'utf-8');

            return JSON.parse(raw) as T;
        } catch (error) {
            console.error('Failed to read cache:', error);

            return null;
        }
    }

    // Write data to cache
    public write(data: T): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error('Failed to write cache:', error);
        }
    }
}
