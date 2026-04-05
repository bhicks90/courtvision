import { isAxiosError } from "axios";

export function handleApiError(error: unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.error || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }
  
  return "Unknown error";
}
