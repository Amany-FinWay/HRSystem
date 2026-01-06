import { RequestsStatus } from "../types/RequestsStatus.type";

export type LeaveRow = {
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: RequestsStatus;
  reason: string;
};