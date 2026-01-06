import { Component, EventEmitter, Output } from '@angular/core';
import { SpinnerToasterService } from '../../../../../../core/services/spinner-toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment-letter',
  imports: [],
  templateUrl: './employment-letter.component.html',
  styleUrl: './employment-letter.component.scss'
})
export class EmploymentLetterComponent {
  
  constructor(
    private spinnerToasterService: SpinnerToasterService,
    private router: Router
  ) {}
@Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    setTimeout(() => {
      this.spinnerToasterService.showToaster('success', 'Your employment letter request has been submitted successfully.');
      this.closeModal();
      this.router.navigate(['/employee/service']);
    }, 2000);
  }
}
