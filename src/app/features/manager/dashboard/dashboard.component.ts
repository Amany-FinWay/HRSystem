import { Component, OnInit } from '@angular/core';
import { AnimatedBgComponent } from '../../../shared/components/animated-bg/animated-bg.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [AnimatedBgComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  allRawData: any[] = [];
  filteredRequests: any[] = [];
  currentFilter: 'pending' | 'approved' | 'rejected' = 'pending';

  stats = { pending: 0, approved: 0, rejected: 0 };

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const leaves = JSON.parse(localStorage.getItem('leaveRows') || '[]');
    const hrDocs = JSON.parse(localStorage.getItem('hr_requests') || '[]');

    const formattedLeaves = leaves.map((l: any) => ({
      ...l,
      category: 'Leave',
      title: l.type,
      date: l.startDate,
      subDetail: `Duration: ${l.days} Day(s)`,
      extraInfo: l.reason
    }));

    const formattedHR = hrDocs.map((h: any) => ({
      ...h,
      category: 'HR Document',
      title: h.type,
      date: h.dateRequested,
      subDetail: `Directed To: ${h.directedTo}`,
      extraInfo: `Language: ${h.language}`
    }));

    this.allRawData = [...formattedLeaves, ...formattedHR];
    this.calculateStats();
    this.applyFilter(this.currentFilter);
  }

  calculateStats() {
    this.stats.pending = this.allRawData.filter(r => r.status === 'pending').length;
    this.stats.approved = this.allRawData.filter(r => r.status === 'approved').length;
    this.stats.rejected = this.allRawData.filter(r => r.status === 'rejected').length;
  }

  applyFilter(status: any) {
    this.currentFilter = status;
    this.filteredRequests = this.allRawData.filter(r => r.status === status);
  }

  onAction(request: any, newStatus: 'approved' | 'rejected') {
    const storageKey = request.category === 'Leave' ? 'leaveRows' : 'hr_requests';
    const rawData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedData = rawData.map((item: any) => {
      if (request.category === 'Leave') {
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
}
