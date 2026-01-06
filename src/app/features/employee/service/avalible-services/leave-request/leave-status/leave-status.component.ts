import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';

type BalanceCard = {
  title: string;
  remaining: number;
  iconBgClass: string;
  iconClass: string; // fontawesome icon class
};

type LeaveRow = {
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
};

@Component({
  selector: 'app-leave-status',
  standalone: true,
  imports: [CommonModule, LeaveRequestComponent],
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export class LeaveStatusComponent {
  showLeaveModal = false;

  balanceCards: BalanceCard[] = [
    {
      title: 'Annual Leave',
      remaining: 15,
      iconBgClass: 'bg-blue-50 text-blue-600',
      iconClass: 'fa-regular fa-calendar-days',
    },
    {
      title: 'Sick Leave',
      remaining: 12,
      iconBgClass: 'bg-green-50 text-green-600',
      iconClass: 'fa-regular fa-clock',
    },
    {
      title: 'Personal Leave',
      remaining: 5,
      iconBgClass: 'bg-purple-50 text-purple-600',
      iconClass: 'fa-solid fa-house',
    },
  ];

  leaveRows: LeaveRow[] = [
    {
      type: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-19',
      days: 5,
      status: 'approved',
      reason: 'Family vacation',
    },
    {
      type: 'Sick Leave',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      days: 3,
      status: 'approved',
      reason: 'Medical treatment',
    },
    {
      type: 'Personal Leave',
      startDate: '2024-02-28',
      endDate: '2024-02-28',
      days: 1,
      status: 'pending',
      reason: 'Personal matters',
    },
  ];

  statusPillClass(status: LeaveRow['status']) {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
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
    this.leaveRows = [
      {
        type: form.leaveType,
        startDate: form.startDate,
        endDate: form.endDate,
        days: 1, // dummy
        status: 'pending',
        reason: form.reason || '-',
      },
      ...this.leaveRows,
    ];
  }
}
