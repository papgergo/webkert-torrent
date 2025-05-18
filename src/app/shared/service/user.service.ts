import { Injectable } from '@angular/core';
import { User } from '../models/user';
import users from '../../../../public/users.json';
import { BehaviorSubject, from, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

export interface UserData {
  user: User | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection = users.map((user) => ({
    ...user,
    id: user.id,
    email: user.email,
    name: user.name,
    profilePictureUrl: user.profilePictureUrl,
    joinDate: new Date(user.joinDate),
  }));

  constructor(private firestore: Firestore, private authService: AuthService) {}

  private userCollection$ = new BehaviorSubject<User[]>(this.userCollection);

  getUserProfile(): Observable<User | null> {
    return this.authService.user.pipe(
      switchMap((userAuth) => {
        if (!userAuth) {
          return of(null);
        } else {
          return from(this.fetchUserData(userAuth.uid));
        }
      })
    );
  }

  private async fetchUserData(userId: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return null;
      }

      const userData = userSnapshot.data() as User;
      return { ...userData, id: userId };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return null;
    }
  }

  getUserByEmail(userEmail: string) {
    return this.userCollection.find((u) => (u.email = userEmail));
  }

  getUserById(userId: string) {
    return this.userCollection.find((u) => (u.id = userId));
  }

  deleteUser(user: User) {
    this.userCollection = this.userCollection.filter(
      (u) => u.email !== user.email
    );
  }
}
