import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">HR Demo App</h1>
    </header>
  `,
  standalone: true
})
export class HeaderComponent {}
