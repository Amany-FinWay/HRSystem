import { Component, EventEmitter, Output } from '@angular/core';
import { SpinnerToasterService } from '../../../../../../core/services/spinner-toaster.service';
import { Router } from '@angular/router';
import { HRLettersModel } from '../../../../../../shared/models/interfaces/HRLetters.model';
import { HRLetterRequestType } from '../../../../../../shared/models/types/HRLetterRequestType.type';
import { Language } from '../../../../../../shared/models/types/Language.type';
import { RequestsStatus } from '../../../../../../shared/models/types/RequestsStatus.type';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from '../../../../../../shared/components/virtual-keyboard/virtual-keyboard.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-salary-certificate',
  standalone: true,
  imports: [CommonModule, VirtualKeyboardComponent, TranslateModule],
  templateUrl: './salary-certificate.component.html',
  styleUrl: './salary-certificate.component.scss',
})
export class SalaryCertificateComponent {
  langOpen: boolean = false;
  selectedLanguage: string = 'English';
  keyboardVisibleTarget: boolean = false;
  showKeyboardTarget: boolean = false;
  directedTo: string = '';

  constructor(
    private spinnerToasterService: SpinnerToasterService,
    private router: Router,
    private translate: TranslateService
  ) {}

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.langOpen = false;
    console.log('Language changed to:', lang);
  }

  appendKey(fieldName: string, char: any) {
    (this as any)[fieldName] = ((this as any)[fieldName] || '') + char;
  }

  backspace(fieldName: string) {
    const currentVal = (this as any)[fieldName];
    if (currentVal) {
      (this as any)[fieldName] = currentVal.slice(0, -1);
    }
  }

  clearInput(fieldName: string) {
    (this as any)[fieldName] = '';
  }

  hideKeyboardTarget() {
    setTimeout(() => {
      this.keyboardVisibleTarget = false;
    }, 200);
  }

  onSubmit(selectedLanguage: string, directedTarget: string) {
    if (!directedTarget) {
      this.spinnerToasterService.showToaster(
        'error',
        this.translate.instant('salary_certificate.toaster.directed_to_required')
      );
      return;
    }

    const newEntry: HRLettersModel = {
      type: HRLetterRequestType.salary,
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
        this.translate.instant('salary_certificate.toaster.submitted_success')
      );
      this.closeModal();
      this.router.navigate(['/employee/service']);
    }, 1000);
  }
}
