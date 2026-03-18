export class ApiRequestBuilder {
    private url: URL;

    constructor(base: string, path: string) {
        this.url = new URL(path, base);
    }

    addParam(key: string, value: string | number | (string | number)[]): this {
        if (Array.isArray(value)) {
            value.forEach((v) => this.url.searchParams.append(key, v.toString()));
        } else {
            this.url.searchParams.append(key, value.toString());
        }
        
        return this;
    }

    build(): string {
        return this.url.toString();
    }
}
