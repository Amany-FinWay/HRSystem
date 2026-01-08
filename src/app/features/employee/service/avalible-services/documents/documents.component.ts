import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentLetterComponent } from './employment-letter/employment-letter.component';
import { SalaryCertificateComponent } from './salary-certificate/salary-certificate.component';
import { HRLettersModel } from '../../../../../shared/models/interfaces/HRLetters.model';
import { HRLetterRequestType } from '../../../../../shared/models/types/HRLetterRequestType.type';
import { RequestsStatus } from '../../../../../shared/models/types/RequestsStatus.type';
import { Language } from '../../../../../shared/models/types/Language.type';
import { AuthService } from '../../../../../core/services/auth.service';
import { UserRole } from '../../../../../shared/models/types/UserRole.type';
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

  constructor(
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const savedData = localStorage.getItem('hr_requests');
    let allRequests: HRLettersModel[] = [];
    if (savedData) {
      allRequests = JSON.parse(savedData);
    } else {
      allRequests = [
        {
          type: HRLetterRequestType.salary,
          dateRequested: '2026-01-02',
          status: RequestsStatus.approved,
          language: Language.english,
          directedTo: 'Embassy of France',
          requester: {
            id: 'BIO123',
            employeeId:'BIO123',
            pin: '4321',
            name: 'Amany Abdelfattah',
            role: UserRole.employee,
            department: 'Software',
            hireDate: '2022-04-03',
            jobTitle: 'Frontend Developer',
            manager: 'Peter Saber',
            avatarUrl: 'https://png.pngtree.com/png-vector/20241019/ourlarge/pngtree-a-smiling-female-employee-posing-png-image_14113973.png',
          }
        },
        {
          type: HRLetterRequestType.experience,
          dateRequested: '2025-12-20',
          status: RequestsStatus.pending,
          language: Language.arabic,
          directedTo: 'General',
          requester: {
            id: 'emp001',
            employeeId: 'emp001',
            pin: '1234',
            name: 'Amr Adel',
            role: UserRole.employee,
            department: 'Software',
            hireDate: '2025-11-01',
            jobTitle: 'Fullstack Developer',
            manager: 'Peter Saber',
            avatarUrl: 'https://i.pravatar.cc/160?img=12',
          }
        }
      ];
      localStorage.setItem('hr_requests', JSON.stringify(allRequests));
    }
    const filteredData = allRequests.filter(req => req.requester.id === this.authService.getUser()?.id);
        this.requestsHistory.set(filteredData);
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
