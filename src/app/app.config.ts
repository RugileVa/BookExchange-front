import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
  ]
};
