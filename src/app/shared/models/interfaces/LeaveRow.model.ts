import { RequestsStatus } from "../types/RequestsStatus.type";
import { User } from "./User.model";

export type LeaveRow = {
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: RequestsStatus;
  reason: string;
  requester: User;
};