import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-test',
  template: `<h1>Test Component</h1>`,
  imports: []
})
export class TestComponent {
  constructor(private auth: AuthService) {
    console.log('TestComponent auth.isLoggedIn =', auth.isLoggedIn);
  }
}
