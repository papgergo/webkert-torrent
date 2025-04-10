import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: User[] = [];
  constructor() {}

  getUser(userEmail: string) {
    return localStorage.getItem(userEmail);
  }

  addUser(newUser: User) {
    localStorage.setItem(newUser.email, newUser.password);
  }
}
