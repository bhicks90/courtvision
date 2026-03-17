import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import chalk from 'chalk';

export class RequestHandler {
    private defaultConfig: AxiosRequestConfig;

    constructor(defaultConfig?: AxiosRequestConfig) {
        this.defaultConfig = defaultConfig || {};
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        console.log(chalk.blue(`[GET] Requesting: ${url}`));
        
        try {
            const response: AxiosResponse<T> = await axios.get(url, {
                ...this.defaultConfig,
                ...config,
            });
            console.log(chalk.green(`[GET] Success: ${url} (Status: ${response.status})`));
            return response.data;
        } catch (error: any) {
            this.handleError(error, url, 'GET');
        }
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        console.log(chalk.blue(`[POST] Requesting: ${url}`));

        try {
            const response: AxiosResponse<T> = await axios.post(url, data, {
                ...this.defaultConfig,
                ...config,
            });
            console.log(chalk.green(`[POST] Success: ${url} (Status: ${response.status})`));
            return response.data;
        } catch (error: any) {
            this.handleError(error, url, 'POST');
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        console.log(chalk.blue(`[PUT] Requesting: ${url}`));

        try {
            const response: AxiosResponse<T> = await axios.put(url, data, {
                ...this.defaultConfig,
                ...config,
            });
            console.log(chalk.green(`[PUT] Success: ${url} (Status: ${response.status})`));
            return response.data;
        } catch (error: any) {
            this.handleError(error, url, 'PUT');
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        console.log(chalk.blue(`[DELETE] Requesting: ${url}`));

        try {
            const response: AxiosResponse<T> = await axios.delete(url, {
                ...this.defaultConfig,
                ...config,
            });

            console.log(chalk.green(`[DELETE] Success: ${url} (Status: ${response.status})`));
            return response.data;
        } catch (error: any) {
            this.handleError(error, url, 'DELETE');
        }
    }

    private handleError(error: any, url?: string, method?: string): never {
        if (axios.isAxiosError(error)) {
            console.log(
                chalk.red(
                    `[${method}] Request failed: ${url} - ${error.response?.status} ${error.response?.statusText}`,
                ),
            );
            throw new Error(
                `Request failed: ${error.response?.status} - ${error.response?.statusText}`,
            );
        } else {
            console.log(chalk.red(`[${method}] Unexpected error: ${error.message}`));
            throw new Error(`Unexpected error: ${error.message}`);
        }
    }
}
