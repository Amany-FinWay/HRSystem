import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../../core/services/auth.service';
import { VirtualKeyboardComponent } from '../../../../../../shared/components/virtual-keyboard/virtual-keyboard.component';
import { User } from '../../../../../../shared/models/interfaces/User.model';
import { AnimatedBgComponent } from '../../../../../../shared/components/animated-bg/animated-bg.component';
import { Router } from '@angular/router';
import { UserRole } from '../../../../../../shared/models/types/UserRole.type';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, VirtualKeyboardComponent, AnimatedBgComponent, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  showKeyboardCurrent = false;
  showKeyboardNew = false;
  showKeyboardConfirm = false;
  private keyboardHideTimeout: any;
  
  employee!: User;

  pinForm = {
    currentPin: '',
    newPin: '',
    confirmPin: '',
  };

  pinError = '';
  pinSuccess = '';
  private messageTimer: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}
  
  ngOnInit() {
    debugger
    this.employee = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    console.log(this.employee);
    

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
     this.pinError = this.translate.instant('profile.messages.fill_all');
      this.clearMessagesAfterDelay();
      return;
    }

    if (this.pinForm.newPin !== this.pinForm.confirmPin) {
      this.pinError = this.translate.instant('profile.messages.not_match');
      this.clearMessagesAfterDelay();
      return;
    }

    if (!/^\d{4}$/.test(this.pinForm.newPin)) {
      this.pinError = this.translate.instant('profile.messages.invalid');
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

  cancel() {
    if(this.auth.getRole() === 'manager') {
      this.router.navigate(['/manager/dashboard']);
    }
  }
}
