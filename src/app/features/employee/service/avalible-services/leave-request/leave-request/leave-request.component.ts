import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
leaveTypeOpen = false;
  leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Personal Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Unpaid Leave',
    'Emergency Leave',
    'Compassionate Leave',
    'Study Leave',
  ];

  form = {
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  };

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.submit.emit(this.form);
    this.onClose();
  }

  stopBackdropClick(e: MouseEvent) {
    e.stopPropagation();
  }
  selectLeaveType(t: string) {
  this.form.leaveType = t;
  this.leaveTypeOpen = false;
}
}
