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
    { id: 'emp001', pin: '1234', name: 'Alice Employee', role: 'employee' },
    { id: 'emp002', pin: '5678', name: 'Bob Employee', role: 'employee' },
    { id: 'mgr001', pin: '0000', name: 'Charlie Manager', role: 'manager' },
  ];

  private loggedInUser?: User;
 
  login(employeeId: string, pin: string): boolean {
    debugger
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
}
