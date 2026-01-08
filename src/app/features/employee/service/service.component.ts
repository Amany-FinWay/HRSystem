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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, AnimatedBgComponent, LeaveStatusComponent, DocumentsComponent, PaySlipComponent, ProfileComponent,TranslateModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit { 
  showGreeting = signal(false);
  userName!: string;
   greetingText = signal<'service.greeting_morning' | 'service.greeting_afternoon' | 'service.greeting_evening'>(
    'service.greeting_morning'
  );

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
      this.greetingText.set('service.greeting_morning');
    } else if (hour < 18) {
      this.greetingText.set('service.greeting_afternoon');
    } else {
      this.greetingText.set('service.greeting_evening');
    }
  }

  selectedCard?: string;

  cards: Card[] = [
    {
      title: 'cards.leave.title',
      description: 'cards.leave.desc',
      iconClass: 'fa-regular fa-calendar-days',
      iconWrapClass: 'bg-blue-600 text-white',
    },
    {
      title: 'cards.payslip.title',
      description: 'cards.payslip.desc',
      iconClass: 'fa-solid fa-dollar-sign',
      iconWrapClass: 'bg-green-600 text-white',
    },
    {
      title: 'cards.hr.title',
      description: 'cards.hr.desc',
      iconClass: 'fa-regular fa-file-lines',
      iconWrapClass: 'bg-purple-600 text-white',
    },
    {
      title: 'cards.profile.title',
      description: 'cards.profile.desc',
      iconClass: 'fa-regular fa-id-card',
      iconWrapClass: 'bg-orange-600 text-white',
    },
  ];

  onCardClick(card: Card) {
    this.selectedCard = card.title;
  }
}
