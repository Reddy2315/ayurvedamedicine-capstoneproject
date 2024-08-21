import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      address: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadFormData();
    
    this.registerForm.get('firstName')?.valueChanges.subscribe(() => this.updateFullName());
    this.registerForm.get('lastName')?.valueChanges.subscribe(() => this.updateFullName());
    
    this.registerForm.valueChanges.subscribe(() => this.saveFormData());
  }

  saveFormData() {
    const formData = this.registerForm.getRawValue();
    localStorage.setItem('registerFormData', JSON.stringify(formData));
  }

  loadFormData() {
    const savedData = localStorage.getItem('registerFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.registerForm.patchValue(parsedData);
      this.updateFullName();
    }
  }

  updateFullName() {
    const firstName = this.registerForm.get('firstName')?.value || '';
    const lastName = this.registerForm.get('lastName')?.value || '';
    this.registerForm.get('fullName')?.setValue(`${firstName} ${lastName}`, { emitEvent: false });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload = {
        userName: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
        address: this.registerForm.get('address')?.value
      };

      this.authService.register(payload).subscribe({
        next: () => {
          this.snackBar.open('Registered successfully!', 'Close', {
            duration: 3000,
          });

          // Clear localStorage data
          localStorage.removeItem('registerFormData');

          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.snackBar.open('Registration failed. Customer with the given email or phone number already exists.', 'Close', {
            duration: 4000,
          });
        }
      });
    }
  }
}
