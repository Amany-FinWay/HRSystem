import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../../core/services/auth.service';
import { VirtualKeyboardComponent } from '../../../../../../shared/components/virtual-keyboard/virtual-keyboard.component';
import { User } from '../../../../../../shared/models/interfaces/User.model';
import { UserRole } from '../../../../../../shared/models/types/UserRole.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, VirtualKeyboardComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  showKeyboardCurrent = false;
  showKeyboardNew = false;
  showKeyboardConfirm = false;
  private keyboardHideTimeout: any;
  
  employee: User = {
    name: 'Amr Adel',
    employeeId: 'EMP-001',
    department: 'Software',
    jobTitle: 'Developer',
    hireDate: '2023-06-15',
    manager: 'Petet Saber',
    avatarUrl: 'https://i.pravatar.cc/160?img=12',
    id: '',
    role: UserRole.employee
  };

  pinForm = {
    currentPin: '',
    newPin: '',
    confirmPin: '',
  };

  pinError = '';
  pinSuccess = '';
  private messageTimer: any;

  constructor(private auth: AuthService) {}
  ngOnInit() {
    debugger
    const u = this.auth.getUser();
    if (u) {
      this.employee.name = u.name;
      this.employee.employeeId = u.id.toUpperCase();
      this.employee.department = 'Software';
      this.employee.jobTitle = 'Developer';
      this.employee.hireDate = '15 March 2020';
      this.employee.manager = 'Peter Saber';
      this.employee.avatarUrl = 'https://i.pravatar.cc/160?img=12';
    }
  }

  private clearMessagesAfterDelay() {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }

    this.messageTimer = setTimeout(() => {
      this.pinError = '';
      this.pinSuccess = '';
    }, 3000);
  }
  savePin() {
    debugger
    this.pinError = '';
    this.pinSuccess = '';

    if (
      !this.pinForm.currentPin ||
      !this.pinForm.newPin ||
      !this.pinForm.confirmPin
    ) {
      this.pinError = 'Please fill all PIN fields.';
      this.clearMessagesAfterDelay();
      return;
    }

    if (this.pinForm.newPin !== this.pinForm.confirmPin) {
      this.pinError = 'New PIN and Confirm PIN do not match.';
      this.clearMessagesAfterDelay();
      return;
    }

    if (!/^\d{4}$/.test(this.pinForm.newPin)) {
      this.pinError = 'PIN must be 4 digits.';
      this.clearMessagesAfterDelay();
      return;
    }

    const result = this.auth.changePin(
      this.pinForm.currentPin,
      this.pinForm.newPin
    );
    if (!result.ok) {
      this.pinError = result.message;
      this.clearMessagesAfterDelay();
      return;
    }

    this.pinSuccess = result.message;
    this.clearMessagesAfterDelay();

    this.pinForm = { currentPin: '', newPin: '', confirmPin: '' };
  }

  hideKeyboardDelayed(field: 'current' | 'new' | 'confirm') {
    this.keyboardHideTimeout = setTimeout(() => {
      if (field === 'current') this.showKeyboardCurrent = false;
      if (field === 'new') this.showKeyboardNew = false;
      if (field === 'confirm') this.showKeyboardConfirm = false;
    }, 200);
  }

 appendKey(field: 'currentPin' | 'newPin' | 'confirmPin', value: string) {
  if (this.pinForm[field].length >= 4) return;
  this.pinForm = {
    ...this.pinForm,
    [field]: this.pinForm[field] + value,
  };
}
  backspace(field: 'currentPin' | 'newPin' | 'confirmPin') {
    this.pinForm[field] = this.pinForm[field].slice(0, -1);
  }

  clearInput(field: 'currentPin' | 'newPin' | 'confirmPin') {
    this.pinForm[field] = '';
  }
}
