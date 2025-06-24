import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule] // ✅ Necesario
})
export class LoginComponent {
  errorMsg = '';
  loginForm!: FormGroup;  // Lo declaras sin inicializar

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    // Inicializas aquí (cuando el constructor ya existe)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    // Aseguramos que no haya null ni undefined
    const credentials = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.auth.login(credentials).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.errorMsg = 'Invalid credentials'
    });
  }
}
