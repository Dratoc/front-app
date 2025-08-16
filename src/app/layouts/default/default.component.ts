import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet, MenuComponent, AlertComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',

})
export class DefaultComponent {
  currentYear = new Date().getFullYear();

  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | 'warning' = 'success';

  showNotification(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000); // Oculta después de 3 segundos
  }

  logout() {
    localStorage.clear(); // o usa tu AuthService
    location.href = '/auth/login';
  }
}
