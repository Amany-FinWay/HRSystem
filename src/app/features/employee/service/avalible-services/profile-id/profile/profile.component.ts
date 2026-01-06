import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  employee = {
    name: 'Amr Adel',
    employeeId: 'EMP-001',
    department: 'Software',
    jobTitle: 'Developer',
    hireDate: '2023-06-15',
    manager: 'Petet Saber',
    avatarUrl: 'https://i.pravatar.cc/160?img=12',
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
  const u = this.auth.getUser();
  if (u) {
    this.employee.name = u.name;
    this.employee.employeeId = u.id.toUpperCase();
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
  this.pinError = '';
  this.pinSuccess = '';

  if (!this.pinForm.currentPin || !this.pinForm.newPin || !this.pinForm.confirmPin) {
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

  const result = this.auth.changePin(this.pinForm.currentPin, this.pinForm.newPin);
  if (!result.ok) {
    this.pinError = result.message;
    this.clearMessagesAfterDelay();
    return;
  }

  this.pinSuccess = result.message;
  this.clearMessagesAfterDelay();

  this.pinForm = { currentPin: '', newPin: '', confirmPin: '' };
}
}
