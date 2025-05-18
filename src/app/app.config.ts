import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({ projectId: "webkerttorrent", appId: "1:880288243419:web:3c212923d98e64f234f6fe", storageBucket: "webkerttorrent.firebasestorage.app", apiKey: "AIzaSyA_vqapq3Z74crAC_lqQFVyxfE41MbBos0", authDomain: "webkerttorrent.firebaseapp.com", messagingSenderId: "880288243419" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
