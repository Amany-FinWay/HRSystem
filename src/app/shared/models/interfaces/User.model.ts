import { UserRole } from '../types/UserRole.type';

export interface User {
  id: string;
  pin: string;
  name: string;
  role: UserRole;
}
