import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class RequestHandler {
    private defaultConfig: AxiosRequestConfig;

    constructor(defaultConfig?: AxiosRequestConfig) {
        this.defaultConfig = defaultConfig || {};
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, {
                ...this.defaultConfig,
                ...config,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.post(url, data, {
                ...this.defaultConfig,
                ...config,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.put(url, data, {
                ...this.defaultConfig,
                ...config,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.delete(url, {
                ...this.defaultConfig,
                ...config,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Request failed: ${error.response?.status} - ${error.response?.statusText}`,
            );
        } else {
            throw new Error(`Unexpected error: ${error.message}`);
        }
    }
}
