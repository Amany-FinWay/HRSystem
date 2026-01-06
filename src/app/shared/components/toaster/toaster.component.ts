import { Component } from '@angular/core';
import { SpinnerToasterService } from '../../../core/services/spinner-toaster.service';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div
      *ngIf="spinnerToasterService.toaster$ | async as t"
      class="fixed top-4 right-4 px-4 py-2 rounded shadow text-white"
      [ngClass]="{
        'bg-green-500': t.type === 'success',
        'bg-red-500': t.type === 'error'
      }"
    >
      {{ t.message }}
    </div>
  `
})
export class ToasterComponent {

  constructor(public spinnerToasterService: SpinnerToasterService) {}

}
