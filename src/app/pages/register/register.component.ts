import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/service/user.service';
import { AuthService } from '../../shared/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinner,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoading: boolean = false;
  signupError: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    localStorage.clear();
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  register() {
    if (this.registerForm.invalid) {
      console.error('invalid');
      return;
    }

    const passw = this.registerForm.get('password')?.value;
    const confpassw = this.registerForm.get('confPassword')?.value;
    const username = this.registerForm.value.username || '';
    const email = this.registerForm.value.email || '';

    if (passw! != confpassw!) {
      console.error('nem egyezik' + passw + ' ' + confpassw);
      return;
    }

    const userData: Partial<User> = {
      name: username,
      profilePictureUrl: 'img/default_profile_picture.png',
      joinDate: new Date(),
    };

    this.authService
      .signUp(email, passw, userData)
      .then((userCredential) => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.error('Regisztrációs hiba:', error);
        this.isLoading = false;

        switch (error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email already in use.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Invalid email.';
            break;
          case 'auth/weak-password':
            this.signupError =
              'The password is too weak. Use at least 6 characters.';
            break;
          default:
            this.signupError =
              'An error has occurred during registration. Please try again later.';
        }
      });
  }
}
