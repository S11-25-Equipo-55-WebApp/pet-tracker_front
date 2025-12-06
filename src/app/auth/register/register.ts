import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  hasError = signal(false);
  isPosting = signal(false);
  authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Input Password
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.min(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.isLoading = true;
      this.registerForm.markAllAsTouched();
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    console.log('✅ Login Data:', this.registerForm.value);
    const { userName = '', nombre = '', apellido = '', email = '', password = '', telefono = ''} = this.registerForm.value;
    this.isPosting.set(true);

    this.authService.register(userName!, nombre!, apellido!, email!, password!, telefono!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    })
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
    const control = this.registerForm.get('username');
    if (control?.hasError('required') && control.touched) {
      return 'El usuario es requerido';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Mínimo 3 caracteres';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.registerForm.get('password');
    if (control?.hasError('required') && control.touched) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Mínimo 6 caracteres';
    }
    return '';
  }
}
