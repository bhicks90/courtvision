import { Response } from 'express';

interface ErrorOptions {
    message?: string; // Custom message for the client
    statusCode?: number; // HTTP status code (default 500)
    data?: any; // Default data to return
    error?: any; // Original error object to log
}

interface SuccessOptions<T> {
    message?: string;
    statusCode?: number;
    data: T;
    res: Response;
}

export const handleApiError = (res: Response, options: ErrorOptions = {}): void => {
    const { message = 'Internal Server Error', statusCode: status = 500, data = null, error } = options;

    // Log the original error for debugging
    if (error) {
        console.error('[API ERROR]', error);
    }

    // Respond to the client
    res.status(status).json({ data, error: message });
};

export const handleApiSuccess = <T>({ res, data, message, statusCode = 200 }: SuccessOptions<T>) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
};
