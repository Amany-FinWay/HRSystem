import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { switchMap, filter, take } from 'rxjs';

// src/app/core/interceptors/api-base-url.interceptor.ts
export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);

  // إذا كان الطلب لملف الـ assets، مرره فوراً
  if (req.url.includes('/assets/')) return next(req);

  return configService.config$.pipe(
    switchMap(config => {
      const baseUrl = config.serverUrl.replace(/\/$/, '');
      const endpoint = req.url.startsWith('/') ? req.url : `/${req.url}`;
      
      const apiReq = req.clone({
        url: `${baseUrl}${endpoint}`
      });
      return next(apiReq);
    })
  );
};