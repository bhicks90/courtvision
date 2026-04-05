import { AsyncStatus } from "./status";

export interface AsyncState<T> {
  data: T;
  status: AsyncStatus;
  error: string | null;
}