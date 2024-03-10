import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'ring-of-fire-b8e24',
          appId: '1:859198688953:web:29fdf0d4d57753e6821568',
          storageBucket: 'ring-of-fire-b8e24.appspot.com',
          apiKey: 'AIzaSyDtb1-jXt9WHsBA8F5sfrKkDuqrH_zA8YM',
          authDomain: 'ring-of-fire-b8e24.firebaseapp.com',
          messagingSenderId: '859198688953',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
