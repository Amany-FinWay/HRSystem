import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pay-slip',
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './pay-slip.component.html',
  styleUrl: './pay-slip.component.scss',
})
export class PaySlipComponent {
  bankInfo = signal({
    bankName: 'Arab Bank',
    accountNumber: 'XXXX-XXXX-1234',
    iban: 'EG12345678901234567890123',
  });

  selectedYear = signal(2024);
  selectedMonth = signal('January');

  years = [2024, 2025, 2026];
months = ['January', 'February', 'March', 'April'];

  payslipDetails = signal({
    basic: 5000,
    allowances: 1200,
    deductions: 300,
    net: 5900
  });

  onFilterChange() {
    const randomBonus = Math.floor(Math.random() * 500);
    const newBasic = 5000 + (this.selectedYear() === 2025 ? 500 : 0);
    this.payslipDetails.set({
      basic: newBasic,
      allowances: 1000 + randomBonus,
      deductions: 200 + (randomBonus / 2),
      net: newBasic + (1000 + randomBonus) - (200 + (randomBonus / 2))
    });
  }
}
