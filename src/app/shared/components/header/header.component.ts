import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
