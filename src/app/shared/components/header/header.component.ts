import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { LangSwitchComponent } from "../lang-switch/lang-switch.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, LangSwitchComponent,TranslateModule],
})
export class HeaderComponent {

 constructor(
    public authService: AuthService,
    public router: Router,
    public themeService: ThemeService,
    private translate: TranslateService
  ) {
    const lang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(lang);
  }

  navigateToProfile() {
    this.router.navigate(['/employee/profile-id']);
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
