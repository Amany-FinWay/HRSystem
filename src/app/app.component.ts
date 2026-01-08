import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { ThemeService } from './core/services/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SpinnerComponent,
    ToasterComponent
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'HRSystem';
  private themeService = inject(ThemeService);

   ngAfterViewInit() {
    import('flowbite');
  }
}
