import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import 'flowbite';

import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfigService } from './app/core/services/config.service';
import { apiBaseUrlInterceptor } from './app/core/interceptors/api-base-url.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr({ positionClass: 'toast-bottom-right' }),
    { provide: NgxSpinnerService, useClass: NgxSpinnerService },
    provideHttpClient(
        withInterceptors([apiBaseUrlInterceptor])
    ),

    provideRouter(routes),
    provideAppInitializer(() => {
        const configService = inject(ConfigService);
        return configService.load();
    }),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
}).catch(console.error);