import { Component } from '@angular/core';
import { SpinnerToasterService } from '../../../core/services/spinner-toaster.service';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, AsyncPipe,TranslateModule],
  template: `
          <div 
            *ngIf="spinnerToasterService.spinner$ | async" 
            class="fixed inset-0 flex justify-center items-center bg-slate-900/40 backdrop-blur-md z-[100] transition-all duration-500"
          >
            <div class="relative flex flex-col items-center">
              <div class="relative h-20 w-20">
                <div class="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500/20 border-l-transparent animate-spin"></div>
                <div class="absolute inset-2 rounded-full border-4 border-t-transparent border-r-emerald-500 border-b-transparent border-l-emerald-500/20 animate-[spin_1.5s_linear_infinite_reverse]"></div>
                
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-sync fa-spin-pulse text-blue-500 dark:text-blue-400 text-xl"></i>
                </div>
              </div>

              <div class="mt-6 flex flex-col items-center gap-1">
                <span class="text-xs font-black uppercase tracking-[0.3em] text-white">
                  {{'spinner.PleaseWait' | translate}}
                </span>
                <div class="flex gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          </div>
  `
})
export class SpinnerComponent {

  constructor(public spinnerToasterService: SpinnerToasterService) {}
}
