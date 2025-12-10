import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword implements OnInit {
  resetForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  hasError = signal(false);
  authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.resetForm = this.fb.group({
      passwodActual: ['', [Validators.required, Validators.minLength(8)]],
      passwordNuevo: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      const { passwodActual, passwordNuevo } = this.resetForm.value;

      this.authService.reset(passwodActual!, passwordNuevo!).subscribe((isAuthenticated) => {
      console.log(isAuthenticated)
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    })

      // Simulación de login
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.markFormGroupTouched(this.resetForm);
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  goBack(): void {
    window.history.back();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get usernameError(): string {
    const control = this.resetForm.get('username');
    if (control?.hasError('required') && control.touched) {
      return 'El usuario es requerido';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Mínimo 3 caracteres';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.resetForm.get('password');
    if (control?.hasError('required') && control.touched) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Mínimo 6 caracteres';
    }
    return '';
  }
}
