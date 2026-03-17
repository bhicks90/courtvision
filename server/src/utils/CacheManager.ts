import chalk from 'chalk';
import { FileCache } from './FileCache';

export interface CacheManagerOptions<T> {
    fileName: string;
    batchSize?: number;
}

export class CacheManager<T extends { id: number }> {
    private fileCache: FileCache<{ data: T[] }>;

    constructor(private options: CacheManagerOptions<T>) {
        this.fileCache = new FileCache<{ data: T[] }>(options.fileName);
    }

    read(): T[] {
        const cached = this.fileCache.read();

        if (cached && Array.isArray(cached.data)) {
            console.log(
                chalk.green(
                    `[CACHE] Loaded ${cached.data.length} items from ${this.options.fileName}`,
                ),
            );
            return cached.data;
        }
        console.log(chalk.yellow(`[CACHE] No cache found for ${this.options.fileName}`));

        return [];
    }

    write(items: T[]): void {
        this.fileCache.write({ data: items });
        console.log(chalk.green(`[CACHE] Wrote ${items.length} items to ${this.options.fileName}`));
    }

    append(items: T[]): void {
        const existing = this.read();
        const merged = [...existing, ...items];

        this.write(merged);
    }

    // get next ID for incremental fetches
    getLastId(): number {
        const existing = this.read();
        
        return existing.length ? existing[existing.length - 1].id : 0;
    }
}
