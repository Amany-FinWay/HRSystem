import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/interfaces/User.model';
import { UserRole } from '../../shared/models/types/UserRole.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private user: any = null;

 constructor(
  private router: Router
) {}

  private dummyUsers: User[] = [
    { id: 'emp001', employeeId: 'emp001', pin: '1234', name: 'Amr Adel', role: UserRole.employee, department: 'Software', hireDate: '2025-11-01', jobTitle: 'Fullstack Developer', manager: 'Peter Saber', avatarUrl: 'https://i.pravatar.cc/160?img=12'},
    { id: 'emp002', employeeId: 'emp002', pin: '5678', name: 'Mohamed Younes', role: UserRole.employee, department: 'Software', hireDate: '2025-09-01', jobTitle: 'Fullstack Developer', manager: 'Peter Saber', avatarUrl: 'https://i.pravatar.cc/160?img=12'},
    { id: 'mgr001', employeeId: 'mgr001', pin: '0000', name: 'Donia Nabil', role: UserRole.manager, department: 'HR', hireDate: '2020-05-15', jobTitle: 'HR Manager', manager: 'Ahmed Amin', avatarUrl: 'https://png.pngtree.com/png-vector/20241019/ourlarge/pngtree-a-smiling-female-employee-posing-png-image_14113973.png' },
  ];

  private loggedInUser?: User;
 
  login(employeeId: string, pin: string): boolean {
    const user = this.dummyUsers.find(
      (u) => u.id === employeeId.toLowerCase() && u.pin === pin
    );
    if (user) {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.loggedInUser = undefined;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser(): User | undefined {
    if (!this.loggedInUser) {
      const stored = localStorage.getItem('user');
      if (stored) this.loggedInUser = JSON.parse(stored);
    }
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getRole(): UserRole | null {
    return this.getUser()?.role ?? null;
  }

  changePin(currentPin: string, newPin: string): { ok: boolean; message: string } {
    const user = this.getUser();
    if (!user) return { ok: false, message: 'Not logged in.' };

    const idx = this.dummyUsers.findIndex((u) => u.id === user.id);
    if (idx === -1) return { ok: false, message: 'User not found.' };

    if (user.pin !== currentPin) {
      return { ok: false, message: 'Current PIN is incorrect.' };
    }

    this.dummyUsers[idx] = { ...this.dummyUsers[idx], pin: newPin };

    this.loggedInUser = { ...this.dummyUsers[idx] };
    localStorage.setItem('user', JSON.stringify(this.loggedInUser));

    return { ok: true, message: 'PIN updated successfully.' };
  }
}
