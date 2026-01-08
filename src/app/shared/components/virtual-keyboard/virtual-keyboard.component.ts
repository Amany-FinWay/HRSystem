import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virtual-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-keyboard.component.html',
  styleUrl: './virtual-keyboard.component.scss'
})
export class VirtualKeyboardComponent {
  @Input() mode: 'letters' | 'numbers' | 'all' = 'letters'; // default safe
  @Output() keyPress = new EventEmitter<string>();
  @Output() backspace = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() space = new EventEmitter<void>();

  constructor(
    public router: Router
  ) {}

  letters: string[][] = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M']
  ];

  numbers: string[][] = [
    ['1','2','3','4','5','6','7','8','9','0']
  ];

  get keys(): string[][] {
    switch(this.mode) {
      case 'letters': return this.letters;
      case 'numbers': return this.numbers;
      case 'all': return [...this.numbers, ...this.letters];
      default: return this.letters;
    }
  }


  pressKey(key: string) { this.keyPress.emit(key); }
  pressBackspace() { this.backspace.emit(); }
  pressClear() { this.clear.emit(); }
  pressSpace() { this.space.emit(); }

}
