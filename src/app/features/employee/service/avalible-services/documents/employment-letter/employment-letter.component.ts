import { Component, EventEmitter, Output } from '@angular/core';
import { SpinnerToasterService } from '../../../../../../core/services/spinner-toaster.service';
import { Router } from '@angular/router';
import { HRLettersModel } from '../../../../../../shared/models/interfaces/HRLetters.model';
import { HRLetterRequestType } from '../../../../../../shared/models/types/HRLetterRequestType.type';
import { RequestsStatus } from '../../../../../../shared/models/types/RequestsStatus.type';
import { Language } from '../../../../../../shared/models/types/Language.type';

@Component({
  selector: 'app-employment-letter',
  imports: [],
  templateUrl: './employment-letter.component.html',
  styleUrl: './employment-letter.component.scss',
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

  onSubmit(selectedLanguage: string, directedTarget: string) {
    if (!directedTarget) {
      this.spinnerToasterService.showToaster(
        'error',
        'Please enter who this letter is directed to'
      );
      return;
    }

    const newEntry: HRLettersModel = {
      type: HRLetterRequestType.experience,
      dateRequested: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: RequestsStatus.pending,
      language: selectedLanguage as Language,
      directedTo: directedTarget,
    };

    try {
      const rawData = localStorage.getItem('hr_requests');
      const history = rawData ? JSON.parse(rawData) : [];
      history.unshift(newEntry);
      localStorage.setItem('hr_requests', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }

    setTimeout(() => {
      this.spinnerToasterService.showToaster(
        'success',
        'Your request has been submitted successfully.'
      );
      this.closeModal();
      this.router.navigate(['/employee/service']);
    }, 1000);
  }
}
