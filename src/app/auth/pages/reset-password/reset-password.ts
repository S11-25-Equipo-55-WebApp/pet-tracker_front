import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
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
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { userName, password, confirmPassword } = this.loginForm.value;

      // Validación de contraseñas coincidentes
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        this.isLoading = false;
        return;
      }

      // Aquí iría la lógica de autenticación
      console.log('Login attempt:', { userName, password });

      // Simulación de login
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.markFormGroupTouched(this.loginForm);
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
    const control = this.loginForm.get('username');
    if (control?.hasError('required') && control.touched) {
      return 'El usuario es requerido';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Mínimo 3 caracteres';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required') && control.touched) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Mínimo 6 caracteres';
    }
    return '';
  }
}
