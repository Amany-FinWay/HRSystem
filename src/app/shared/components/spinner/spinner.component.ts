import { Component } from '@angular/core';
import { SpinnerToasterService } from '../../../core/services/spinner-toaster.service';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div *ngIf="spinnerToasterService.spinner$ | async" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="loader bg-white p-4 rounded">Loading...</div>
    </div>
  `
})
export class SpinnerComponent {

  constructor(public spinnerToasterService: SpinnerToasterService) {}
}
