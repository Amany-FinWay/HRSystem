import { Component, EventEmitter, Output } from '@angular/core';
import { SpinnerToasterService } from '../../../../../../core/services/spinner-toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-certificate',
  imports: [],
  templateUrl: './salary-certificate.component.html',
  styleUrl: './salary-certificate.component.scss'
})
export class SalaryCertificateComponent {

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
      this.spinnerToasterService.showToaster('success', 'Your salary certificate request has been submitted successfully.');
      this.closeModal();
      this.router.navigate(['/employee/service']);
    }, 2000);
  }
}
