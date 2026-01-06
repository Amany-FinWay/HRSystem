import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentLetterComponent } from './employment-letter/employment-letter.component';
import { SalaryCertificateComponent } from './salary-certificate/salary-certificate.component';
type Card = {
  title: string;
  description: string;
  iconClass: string; // FontAwesome class
  iconWrapClass: string; // background + text + sizing
};

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, SalaryCertificateComponent, EmploymentLetterComponent],
  templateUrl: 'documents.component.html',
})
export class DocumentsComponent {
  showSalaryModal = false;
  showExperienceModal = false;

  openSalaryModal() {
    this.showSalaryModal = true;
  }

  closeSalaryModal() {
    this.showSalaryModal = false;
  }
  openExperienceModal() {
    this.showSalaryModal = true;
  }

  closeExperienceModal() {
    this.showSalaryModal = false;
  }
}
