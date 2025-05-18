import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  UserCredential,
  User as FireUser,
  signOut,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<FireUser | null>;
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.user = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  async signUp(
    email: string,
    password: string,
    userData: Partial<FireUser>
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
      });

      return userCredential;
    } catch (error) {
      console.error('An error has occoured during registration:', error);
      throw error;
    }
  }

  private async createUserData(
    userId: string,
    userData: Partial<User>
  ): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);

    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FireUser | null> {
    return this.user;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}
