import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedBgComponent } from "../../../shared/components/animated-bg/animated-bg.component";
import { LeaveStatusComponent } from "./avalible-services/leave-request/leave-status/leave-status.component";
import { DocumentsComponent } from './avalible-services/documents/documents.component';
import { PaySlipComponent } from "./avalible-services/pay-slip/pay-slip.component";
import { Router } from '@angular/router';
import { ProfileComponent } from "./avalible-services/profile-id/profile/profile.component";
import { Card } from '../../../shared/models/interfaces/Card.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, AnimatedBgComponent, LeaveStatusComponent, DocumentsComponent, PaySlipComponent, ProfileComponent],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit { 
  showGreeting = signal(false);
  userName!: string;
  greetingText = signal('');
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setGreetingByTime();
    this.userName = this.authService.getUser()?.name!;
    this.showGreeting.set(true);
    setTimeout(() => {
      this.showGreeting.set(false);
    }, 3000);
  }

  setGreetingByTime() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greetingText.set('Good Morning');
    } else if (hour < 18) {
      this.greetingText.set('Good Afternoon');
    } else {
      this.greetingText.set('Good Evening');
    }
  }
  
  selectedCard?: string;
  cards: Card[] = [
    {
      title: 'Leave Management',
      description: 'Submit leave application',
      iconClass: 'fa-regular fa-calendar-days',
      iconWrapClass: 'bg-blue-600 text-white',
    },
    {
      title: 'Financials',
      description: 'Apply for loan/advance',
      iconClass: 'fa-solid fa-dollar-sign',
      iconWrapClass: 'bg-green-600 text-white',
    },
    {
      title: 'HR Letters',
      description: 'Download salary certificate',
      iconClass: 'fa-regular fa-file-lines',
      iconWrapClass: 'bg-purple-600 text-white',
    },
    {
      title: 'Profile & ID',
      description: 'Request new ID card',
      iconClass: 'fa-regular fa-id-card',
      iconWrapClass: 'bg-orange-600 text-white',
    },
  ];

  onCardClick(card: Card) {
    this.selectedCard = card.title;
  }
}
