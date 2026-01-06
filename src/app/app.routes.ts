import { Routes } from '@angular/router';

// Employee components


// 🔑 Import the AuthGuard
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/employee/auth/login/login.component';
import { EmploymentLetterComponent } from './features/employee/documents/employment-letter/employment-letter.component';
import { SalaryCertificateComponent } from './features/employee/documents/salary-certificate/salary-certificate.component';
import { LeaveRequestComponent } from './features/employee/leave/leave-request/leave-request.component';
import { LeaveStatusComponent } from './features/employee/leave/leave-status/leave-status.component';
import { PaySlipComponent } from './features/employee/pay-slip/pay-slip/pay-slip.component';
import { DashboardComponent } from './features/manager/dashboard/dashboard.component';
import { LeaveApprovalComponent } from './features/manager/leave-approval/leave-approval.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'leave-request', component: LeaveRequestComponent, canActivate: [AuthGuard] },
  { path: 'leave-status', component: LeaveStatusComponent, canActivate: [AuthGuard] },
  { path: 'salary-certificate', component: SalaryCertificateComponent, canActivate: [AuthGuard] },
  { path: 'employment-letter', component: EmploymentLetterComponent, canActivate: [AuthGuard] },
  { path: 'pay-slip', component: PaySlipComponent, canActivate: [AuthGuard] },

  { path: 'manager/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'manager/leave-approval', component: LeaveApprovalComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];
