import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentLetterComponent } from './employment-letter/employment-letter.component';
import { SalaryCertificateComponent } from './salary-certificate/salary-certificate.component';
import { HRLettersModel } from '../../../../../shared/models/interfaces/HRLetters.model';
import { HRLetterRequestType } from '../../../../../shared/models/types/HRLetterRequestType.type';
import { RequestsStatus } from '../../../../../shared/models/types/RequestsStatus.type';
import { Language } from '../../../../../shared/models/types/Language.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    SalaryCertificateComponent,
    EmploymentLetterComponent,
    TranslateModule
  ],
  templateUrl: 'documents.component.html',
})
export class DocumentsComponent implements OnInit {
  requestsHistory = signal<any[]>([]);
  showSalaryModal = false;
  showExperienceModal = false;

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const savedData = localStorage.getItem('hr_requests');

    if (savedData) {
      this.requestsHistory.set(JSON.parse(savedData));
    } else {
      const initialData: HRLettersModel[] = [
        {
          type: HRLetterRequestType.salary,
          dateRequested: '2026-01-02',
          status: RequestsStatus.approved,
          language: Language.english,
          directedTo: 'Embassy of France',
        },
        {
          type: HRLetterRequestType.experience,
          dateRequested: '2025-12-20',
          status: RequestsStatus.pending,
          language: Language.arabic,
          directedTo: 'General',
        },
      ];

      localStorage.setItem('hr_requests', JSON.stringify(initialData));
      this.requestsHistory.set(initialData);
    }
  }

  downloadFile(req: HRLettersModel) {
    const filePath = 'assets/salary-certificate.pdf'; 
    const link = document.createElement('a');
    link.href = filePath;
    link.download = `${req.type}-${req.dateRequested}.pdf`;
    link.click();
  }

  @HostListener('window:storage', ['$event'])
    onStorageChange(event: StorageEvent) {
      if (event.key === 'hr_requests') {
        this.loadRequests();
      }
  }

  openSalaryModal() {
    this.showSalaryModal = true;
  }

  closeSalaryModal() {
    this.showSalaryModal = false;
  }
  openExperienceModal() {
    this.showExperienceModal = true;
  }

  closeExperienceModal() {
    this.showExperienceModal = false;
  }

  getTypeKey(type: any): string {
  if (type === 'salary' || type === 'experience') return type;

  const t = String(type).toLowerCase();
  if (t.includes('salary')) return 'salary';
  if (t.includes('experience')) return 'experience';

  // fallback
  return 'salary';
}

getStatusKey(status: any): string {
  const s = String(status).toLowerCase();
  if (s.includes('approved')) return 'approved';
  if (s.includes('pending')) return 'pending';
  if (s.includes('rejected')) return 'rejected';
  return 'pending';
}

getLangKey(lang: any): string {
  const l = String(lang).toLowerCase();
  if (l.includes('english') || l === 'en') return 'english';
  if (l.includes('arabic') || l === 'ar') return 'arabic';
  return 'english';
}

}
