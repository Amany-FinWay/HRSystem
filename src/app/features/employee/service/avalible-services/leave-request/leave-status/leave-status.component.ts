import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';
import { BalanceCard } from '../../../../../../shared/models/interfaces/BalanceCard.model';
import { LeaveRow } from '../../../../../../shared/models/interfaces/LeaveRow.model';
import { RequestsStatus } from '../../../../../../shared/models/types/RequestsStatus.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-leave-status',
  standalone: true,
  imports: [CommonModule, LeaveRequestComponent,TranslateModule],
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export class LeaveStatusComponent implements OnInit {
  showLeaveModal = false;

  balanceCards: BalanceCard[] = [
  {
    title: 'leave_status.cards.annual',
    remaining: 15,
    iconBgClass: 'bg-blue-50 text-blue-600',
    iconClass: 'fa-regular fa-calendar-days',
  },
  {
    title: 'leave_status.cards.sick',
    remaining: 12,
    iconBgClass: 'bg-green-50 text-green-600',
    iconClass: 'fa-regular fa-clock',
  },
  {
    title: 'leave_status.cards.personal',
    remaining: 5,
    iconBgClass: 'bg-purple-50 text-purple-600',
    iconClass: 'fa-solid fa-house',
  },
];


  leaveRows: LeaveRow[] = [];

  // Demo data
  private demoData: LeaveRow[] = [
  {
    type: 'leave_status.cards.annual',
    startDate: '2024-02-15',
    endDate: '2024-02-19',
    days: 5,
    status: RequestsStatus.approved,
    reason: 'Family vacation',
  },
  {
    type: 'leave_status.cards.sick',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    days: 3,
    status: RequestsStatus.approved,
    reason: 'Medical treatment',
  },
  {
    type: 'leave_status.cards.personal',
    startDate: '2024-02-28',
    endDate: '2024-02-28',
    days: 1,
    status: RequestsStatus.pending,
    reason: 'Personal matters',
  },
];

  ngOnInit(): void {
    this.loadLeaveRows();
  }

loadLeaveRows() {
  const stored = localStorage.getItem('leaveRows');

  const mapOldTypeToKey: Record<string, string> = {
    'Annual Leave': 'leave_status.cards.annual',
    'Sick Leave': 'leave_status.cards.sick',
    'Personal Leave': 'leave_status.cards.personal',
  };

  if (stored) {
    const parsed: LeaveRow[] = JSON.parse(stored);

    // upgrade old saved data (if any)
    this.leaveRows = parsed.map((r) => ({
      ...r,
      type: mapOldTypeToKey[r.type] ?? r.type,
    }));

    // save upgraded version
    this.saveLeaveRows();
  } else {
    this.leaveRows = this.demoData;
    this.saveLeaveRows();
  }
}

  saveLeaveRows() {
    localStorage.setItem('leaveRows', JSON.stringify(this.leaveRows));
  }

  statusPillClass(status: LeaveRow['status']) {
    switch (status) {
      case RequestsStatus.approved:
        return 'bg-green-100 text-green-700';
      case RequestsStatus.pending:
        return 'bg-yellow-100 text-yellow-700';
      case RequestsStatus.rejected:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  openRequestLeave() {
    this.showLeaveModal = true;
  }

  closeLeaveModal() {
    this.showLeaveModal = false;
  }

  handleSubmit(form: any) {
    const newLeave: LeaveRow = {
      type: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      days: this.calculateDays(form.startDate, form.endDate),
      status: RequestsStatus.pending,
      reason: form.reason || '-',
    };

    this.leaveRows = [newLeave, ...this.leaveRows];
    this.saveLeaveRows();
  }

  calculateDays(start: string | Date, end: string | Date): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
}
