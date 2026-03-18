import { Response } from 'express';

interface ErrorOptions {
    message?: string; // Custom message for the client
    status?: number; // HTTP status code (default 500)
    data?: any; // Default data to return
    error?: any; // Original error object to log
}

export const handleApiError = (res: Response, options: ErrorOptions = {}): void => {
    const { message = 'Internal Server Error', status = 500, data = null, error } = options;

    // Log the original error for debugging
    if (error) {
        console.error('[API ERROR]', error);
    }

    // Respond to the client
    res.status(status).json({ data, error: message });
};
