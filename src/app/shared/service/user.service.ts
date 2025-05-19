import { Injectable } from '@angular/core';
import { User } from '../models/user';
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
  constructor(private firestore: Firestore, private authService: AuthService) {}

  private userCollection$ = new BehaviorSubject<User[]>([]);

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

  getUserProfileById(userId: string): Observable<User | null> {
    return this.userCollection$.pipe(
      take(1),
      switchMap((users) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
          return of(user);
        } else {
          return from(this.fetchUserData(userId));
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
}
