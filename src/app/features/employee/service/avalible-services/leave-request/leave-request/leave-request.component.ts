import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VirtualKeyboardComponent } from '../../../../../../shared/components/virtual-keyboard/virtual-keyboard.component';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [CommonModule, FormsModule, VirtualKeyboardComponent],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  leaveTypeOpen = false;
  keyboardVisibleTarget: boolean = false;
  showKeyboardTarget: boolean = false;
  reason: string = '';
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

  appendKey(fieldName: string, char: any) {
    (this as any)[fieldName] = ((this as any)[fieldName] || '') + char;
  }

  backspace(fieldName: string) {
    const currentVal = (this as any)[fieldName];
    if (currentVal) {
      (this as any)[fieldName] = currentVal.slice(0, -1);
    }
  }

  clearInput(fieldName: string) {
    (this as any)[fieldName] = '';
  }

  hideKeyboardTarget() {
    setTimeout(() => {
      this.keyboardVisibleTarget = false;
    }, 200);
  }

  onSubmit() {
    this.form.reason = this.reason;
    this.submit.emit(this.form);
    this.reason = '';
    this.form.reason = '';
    this.form.endDate = '';
    this.form.startDate = '';
    this.form.leaveType = '';
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
