import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: User[] = [];
  constructor() {}

  getUser(userEmail: string) {
    const userData = localStorage.getItem(userEmail);
    return userData ? JSON.parse(userData) : null;
  }

  addUser(newUser: User) {
    localStorage.setItem(newUser.email, JSON.stringify(newUser));
  }

  getLoggedInUser() {
    const userEmail = localStorage.getItem('loggedInUser');
    if (!userEmail) return null;
    return this.getUser(userEmail);
  }

  logout() {
    const userEmail: string | null = localStorage.getItem('loggedInUser');
    localStorage.removeItem(userEmail!);
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('isLoggedIn', 'false');
  }
}
