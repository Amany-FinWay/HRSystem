import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerToasterService } from '../../../../core/services/spinner-toaster.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { VirtualKeyboardComponent } from '../../../../shared/components/virtual-keyboard/virtual-keyboard.component';
import { CommonModule } from '@angular/common';
import { AnimatedBgComponent } from '../../../../shared/components/animated-bg/animated-bg.component';
import { UserRole } from '../../../../shared/models/types/UserRole.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, VirtualKeyboardComponent, CommonModule, AnimatedBgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  employeeId: string = '';
  pin: string = '';

  keyboardVisibleEmployeeId: boolean = false;
  keyboardVisiblePin: boolean = false;
  preventHideEmployeeId: boolean = false;
  preventHidePin: boolean = false;
  showBiometricMessage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerToasterService: SpinnerToasterService
  ) {}

  // ================= Virtual Keyboard Methods =================
  appendEmployeeId(value: string) {
    this.employeeId += value;
    this.preventHideEmployeeId = true;
    setTimeout(() => (this.preventHideEmployeeId = false), 0);
  }
  backspaceEmployeeId() { this.employeeId = this.employeeId.slice(0, -1); }
  clearEmployeeId() { this.employeeId = ''; }
  appendEmployeeIdSpace() { this.employeeId += ' '; this.preventHideEmployeeId = true; setTimeout(() => (this.preventHideEmployeeId = false), 0); }

  appendPin(value: string) {
    this.pin += value;
    this.preventHidePin = true;
    setTimeout(() => (this.preventHidePin = false), 0);
  }
  backspacePin() { this.pin = this.pin.slice(0, -1); }
  clearPin() { this.pin = ''; }
  appendPinSpace() { this.pin += ' '; this.preventHidePin = true; setTimeout(() => (this.preventHidePin = false), 0); }

  showKeyboardEmployeeId() { this.keyboardVisibleEmployeeId = true; }
  hideKeyboardEmployeeId() { if (!this.preventHideEmployeeId) this.keyboardVisibleEmployeeId = false; }

  showKeyboardPin() { this.keyboardVisiblePin = true; }
  hideKeyboardPin() { if (!this.preventHidePin) this.keyboardVisiblePin = false; }

  // ================= Standard Login =================
  login() {
    if (!this.employeeId || !this.pin) {
      this.spinnerToasterService.showToaster('error', 'Please enter Employee ID and PIN');
      return;
    }

    this.spinnerToasterService.showSpinner();
    setTimeout(() => {
      this.spinnerToasterService.hideSpinner();
      const success = this.authService.login(this.employeeId, this.pin);

      if (success) {
        this.spinnerToasterService.showToaster('success', 'Login successful');
        const role = this.authService.getRole();
        if (role === 'employee') this.router.navigate(['/employee/service']);
        if (role === 'manager') this.router.navigate(['/manager/dashboard']);
      } else {
        this.spinnerToasterService.showToaster('error', 'Invalid Employee ID or PIN');
      }
    }, 800);
  }

  // ================= Biometric Login =================
  loginBiometric() {
    this.showBiometricMessage = true;
    const user = {
      id: 'BIO123',
      name: 'Amany Abdelfattah',
      role: UserRole.employee
    };
    localStorage.setItem('user', JSON.stringify(user));
    setTimeout(() => {
      this.showBiometricMessage = false;
      this.spinnerToasterService.showToaster('success', 'Biometric login successful');
      this.authService.setUser({
        employeeId: 'BIO123',
        role: UserRole.employee,
        name: 'Mohamed Younes'
      });
      this.router.navigate(['/employee/service']);
    }, 2000);
  }
}
