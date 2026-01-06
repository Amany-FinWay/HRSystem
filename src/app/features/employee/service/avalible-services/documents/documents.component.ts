import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentLetterComponent } from './employment-letter/employment-letter.component';
import { SalaryCertificateComponent } from './salary-certificate/salary-certificate.component';
import { HRLettersModel } from '../../../../../shared/models/interfaces/HRLetters.model';
import { HRLetterRequestType } from '../../../../../shared/models/types/HRLetterRequestType.type';
import { RequestsStatus } from '../../../../../shared/models/types/RequestsStatus.type';
import { Language } from '../../../../../shared/models/types/Language.type';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    SalaryCertificateComponent,
    EmploymentLetterComponent,
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
}
