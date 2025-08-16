import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message: string | null = null;
  type: 'success' | 'error' | 'warning' | null = null;
  private timeoutId: any;

  constructor() {}

  private show(message: string, type: 'success' | 'error' | 'warning') {
    this.clear(); // Clear any previous message
    this.message = message;
    this.type = type;
    this.timeoutId = setTimeout(() => this.clear(), 4000); // Auto-dismiss after 4s
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  clear() {
    this.message = null;
    this.type = null;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
