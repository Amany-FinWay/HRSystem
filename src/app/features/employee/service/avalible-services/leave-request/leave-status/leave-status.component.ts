import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';
import { BalanceCard } from '../../../../../../shared/models/interfaces/BalanceCard.model';
import { LeaveRow } from '../../../../../../shared/models/interfaces/LeaveRow.model';
import { RequestsStatus } from '../../../../../../shared/models/types/RequestsStatus.type';
import { AuthService } from '../../../../../../core/services/auth.service';
import { UserRole } from '../../../../../../shared/models/types/UserRole.type';

@Component({
  selector: 'app-leave-status',
  standalone: true,
  imports: [CommonModule, LeaveRequestComponent],
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export class LeaveStatusComponent implements OnInit {
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

  leaveRows: LeaveRow[] = [];

  constructor(
    private authService: AuthService
  ) {}

    // Demo data
  private demoData: LeaveRow[] = [];

  ngOnInit(): void {
    this.demoData = [
      {
        type: 'Annual Leave',
        startDate: '2024-02-15',
        endDate: '2024-02-19',
        days: 5,
        status: RequestsStatus.approved,
        reason: 'Family vacation',
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
      },
      {
        type: 'Sick Leave',
        startDate: '2024-01-10',
        endDate: '2024-01-12',
        days: 3,
        status: RequestsStatus.approved,
        reason: 'Medical treatment',
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
      },
      {
        type: 'Personal Leave',
        startDate: '2024-02-28',
        endDate: '2024-02-28',
        days: 1,
        status: RequestsStatus.pending,
        reason: 'Personal matters',
        requester: {
          id: 'emp002',
          employeeId: 'emp002',
          pin: '5678',
          name: 'Mohamed Younes',
          role: UserRole.employee,
          department: 'Software',
          hireDate: '2025-09-01',
          jobTitle: 'Fullstack Developer',
          manager: 'Peter Saber',
          avatarUrl: 'https://i.pravatar.cc/160?img=12',
        }
      },
    ]
    this.loadLeaveRows();
  }

  loadLeaveRows() {
    const stored = localStorage.getItem('leaveRows');
    let allRows = [];
    if (stored) {
      allRows = JSON.parse(stored);
    } else {
      allRows = this.demoData;
    }
    this.leaveRows = allRows.filter((row: LeaveRow) => row.requester.id === this.authService.getUser()?.id);
    this.saveLeaveRows();
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
      requester: {
        id: this.authService.getUser()?.id || '',
        employeeId: this.authService.getUser()?.employeeId || '',
        pin: this.authService.getUser()?.pin || '',
        name: this.authService.getUser()?.name || '',
        role: this.authService.getRole() ?? UserRole.employee,
        department: this.authService.getUser()?.department || '',
        hireDate: this.authService.getUser()?.hireDate || '',
        jobTitle: this.authService.getUser()?.jobTitle || '',
        manager: this.authService.getUser()?.manager || '',
        avatarUrl: this.authService.getUser()?.avatarUrl || '',
      }
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
