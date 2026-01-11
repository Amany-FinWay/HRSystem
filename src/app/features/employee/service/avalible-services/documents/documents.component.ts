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
import { DocumentService } from '../../../../../core/services/document.service';
import { ConfigService } from '../../../../../core/services/config.service';
import { AvailablePrintersModel } from '../../../../../shared/models/interfaces/AvailablePrinters.model';
import { ActivePrinterModel } from '../../../../../shared/models/interfaces/ActivePrinterModel';
import { SpinnerToasterService } from '../../../../../core/services/spinner-toaster.service';

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
  activePrinter!: ActivePrinterModel;
  fullPath: string = '';

  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private configService: ConfigService,
    private spinnerService: SpinnerToasterService
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
            name: 'Gamal Hazem',
            role: UserRole.employee,
            department: 'PS',
            hireDate: '2025-09-01',
            jobTitle: 'PS Engineer',
            manager: 'Waheed Magdy',
            avatarUrl: 'https://i.pravatar.cc/160?img=12',
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

  downloadFile(req: any) {
    this.spinnerService.showSpinner();
    const typeMapping: { [key: string]: string } = {
      'Experience Certificate': 'experience',
      'Salary Definition Letter': 'payslip'
    };
    const empId = req.requester.employeeId;
    const docType = typeMapping[req.type] || 'unknown';
    const lang = req.language?.toLowerCase() === 'arabic' ? 'AR' : 'EN';
    const fileName = `${empId}-${docType}-${lang}.pdf`;
    this.fullPath = `${this.configService.baseDocumentPath}/${fileName}`;
    console.log(this.fullPath);

    this.documentService.ListPrinters().subscribe({
      next: (printers: AvailablePrintersModel[]) => {
        if (printers.length === 0) {
            this.spinnerService.hideSpinner();
            this.spinnerService.showToaster('error', 'No printers found');
            return;
        }
        printers.forEach(printer => {
          this.onGetActivePrinter(printer.Index);
        });
      },error: (err) => {
        this.spinnerService.hideSpinner();
        this.spinnerService.showToaster('error', 'Failed to load printers');
      }
    });
  }

  onGetActivePrinter(index: number) {
    this.documentService.GetActivePrinter(index).subscribe({
      next: (printerStatus) => {
        const targetPrinterName = this.configService.defaultPrinterName;
      const currentPrinterName = printerStatus.status.Name;
      const isReady = printerStatus.status.StatusText === 'Ready';

        if(isReady && currentPrinterName.trim() === targetPrinterName.trim()) {
          this.activePrinter = printerStatus;
          console.log(this.activePrinter);
          this.onPrintDocument(this.fullPath, printerStatus.status.Index);
        }else{
          console.log(`Skipping: ${currentPrinterName} (Not a match or not ready)`);
        }
      },
      error: () => this.spinnerService.hideSpinner()
    });
  }

  onPrintDocument(pdf_pah: string, index: number) {
    this.documentService.PrintDocument(pdf_pah, index).subscribe({
      next: () => {
        console.log('Print job sent successfully.');
        this.spinnerService.hideSpinner();
        this.spinnerService.showToaster('success', 'Document sent to printer successfully');
      },
      error: (err) => {
        this.spinnerService.hideSpinner();
        this.spinnerService.showToaster('error', 'Failed to print document');
      }
    });
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
