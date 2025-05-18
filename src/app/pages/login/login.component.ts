import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../shared/service/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/service/auth.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinner,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  public loginError!: string;
  authSubscription?: Subscription;
  isLoading = false;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  login() {
    if (this.email.invalid) {
      return;
    }

    if (this.password.invalid) {
      return;
    }
    const email = this.email.value || '';
    const password = this.password.value || '';
    this.loginError = '';
    this.isLoading = true;

    this.authService
      .signIn(email, password)
      .then(() => {
        this.authService.updateLoginStatus(true);
        window.location.href = '/home';
      })
      .catch((err) => {
        this.isLoading = false;
        switch (err.code) {
          case 'auth/user-not-found':
            this.loginError = 'No user found';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Incorrect password';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Invalid email or password';
            break;
          default:
            this.loginError = 'Error occoured. Please try again';
        }
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
