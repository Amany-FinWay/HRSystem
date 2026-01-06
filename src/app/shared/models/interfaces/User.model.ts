import { UserRole } from '../types/UserRole.type';

export interface User {
  id: string;
  pin?: string;
  name: string;
  role: UserRole;
  employeeId?: string;
  department?: string;
  jobTitle?: string;
  hireDate?: string;
  manager?: string;
  avatarUrl?: string;
}
