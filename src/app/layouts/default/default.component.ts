import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',

})
export class DefaultComponent {
  currentYear = new Date().getFullYear();

    logout() {
      localStorage.clear(); // o usa tu AuthService
      location.href = '/auth/login';
    }
}
