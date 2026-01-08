import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang-switch.component.html',
})
export class LangSwitchComponent {
  currentLang: 'en' | 'ar' = 'en';

  constructor(private translate: TranslateService) {
    const savedLang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
    this.setLang(savedLang);
  }

  toggleLang() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLang(newLang);
  }

  private setLang(lang: 'en' | 'ar') {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);

    // RTL / LTR
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
