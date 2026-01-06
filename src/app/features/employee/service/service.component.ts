import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedBgComponent } from "../../../shared/components/animated-bg/animated-bg.component";

type Card = {
  title: string;
  description: string;
  iconClass: string;        // FontAwesome class
  iconWrapClass: string;    // background + text + sizing
};

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, AnimatedBgComponent],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
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
    console.log('Clicked:', card.title);
  }
}
