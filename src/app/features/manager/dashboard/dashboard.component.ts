import { Component, OnInit } from '@angular/core';
import { AnimatedBgComponent } from '../../../shared/components/animated-bg/animated-bg.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AnimatedBgComponent, CommonModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  allRawData: any[] = [];
  filteredRequests: any[] = [];
  currentFilter: 'pending' | 'approved' | 'rejected' = 'pending';

  stats = { pending: 0, approved: 0, rejected: 0 };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadRequests();

    // لو بتغير اللغة runtime وعايز الداشبورد يعيد صياغة النصوص المركبة:
    this.translate.onLangChange.subscribe(() => {
      this.loadRequests();
    });
  }

  loadRequests() {
    const leaves = JSON.parse(localStorage.getItem('leaveRows') || '[]');
    const hrDocs = JSON.parse(localStorage.getItem('hr_requests') || '[]');

    const formattedLeaves = leaves.map((l: any) => ({
      ...l,
      category: 'dashboard.categories.leave', // key
      title: l.type, // خليها key عندك (زي leave_status.cards.annual) عشان تتترجم
      date: l.startDate,
      subDetail: this.translate.instant('dashboard.details.duration', { days: l.days }),
      extraInfo: l.reason ? l.reason : this.translate.instant('dashboard.common.no_reason'),
    }));

    const formattedHR = hrDocs.map((h: any) => ({
      ...h,
      category: 'dashboard.categories.hr_document', // key
      title: h.type, // الأفضل تكون key زي hr_letter.type.salary / hr_letter.type.experience
      date: h.dateRequested,
      subDetail: this.translate.instant('dashboard.details.directed_to', { to: h.directedTo }),
      extraInfo: this.translate.instant('dashboard.details.language', { lang: h.language }),
    }));

    this.allRawData = [...formattedLeaves, ...formattedHR];
    this.calculateStats();
    this.applyFilter(this.currentFilter);
  }

  calculateStats() {
    this.stats.pending = this.allRawData.filter((r) => r.status === 'pending').length;
    this.stats.approved = this.allRawData.filter((r) => r.status === 'approved').length;
    this.stats.rejected = this.allRawData.filter((r) => r.status === 'rejected').length;
  }

  applyFilter(status: any) {
    this.currentFilter = status;
    this.filteredRequests = this.allRawData.filter((r) => r.status === status);
  }

  onAction(request: any, newStatus: 'approved' | 'rejected') {
    const storageKey = request.category === 'dashboard.categories.leave' ? 'leaveRows' : 'hr_requests';
    const rawData = JSON.parse(localStorage.getItem(storageKey) || '[]');

    const updatedData = rawData.map((item: any) => {
      if (storageKey === 'leaveRows') {
        if (item.type === request.type && item.startDate === request.startDate && item.reason === request.reason) {
          return { ...item, status: newStatus };
        }
      } else {
        if (item.type === request.type && item.dateRequested === request.dateRequested && item.directedTo === request.directedTo) {
          return { ...item, status: newStatus };
        }
      }
      return item;
    });

    localStorage.setItem(storageKey, JSON.stringify(updatedData));
    this.loadRequests();
  }

  //translate Type
getTitleKeyOrText(title: string): string {
  if (!title) return '';

  const normalized = title.trim().toLowerCase();

  if (normalized === 'salary definition letter') {
    return 'documents.type.salary';
  }

  if (normalized === 'experience certificate') {
    return 'documents.type.experience';
  }

  return title; 
}
}
