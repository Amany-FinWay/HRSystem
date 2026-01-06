import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// استيراد الـ shared components كـ Standalone
import { HeaderComponent } from './shared/components/header/header.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
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

   ngAfterViewInit() {
    import('flowbite');
  }
}
