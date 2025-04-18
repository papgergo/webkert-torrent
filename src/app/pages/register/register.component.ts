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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private userService: UserService) {
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

    const newUser: User = {
      id: 0,
      email: email,
      name: username,
      password: passw,
      profilePictureUrl: 'img/default_profile_picture.png',
      joinDate: new Date(Date.now()),
    };

    this.userService.addUser(newUser);
    localStorage.setItem('loggedInUser', newUser.email);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/home';
  }
}
