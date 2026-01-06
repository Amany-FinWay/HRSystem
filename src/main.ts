import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr({ positionClass: 'toast-bottom-right' }),
    { provide: NgxSpinnerService, useClass: NgxSpinnerService },
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
