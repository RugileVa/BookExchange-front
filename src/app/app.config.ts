import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.development';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'; // <-- Import HttpClientModule
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(HttpClientModule), // <-- Add HttpClientModule here
    importProvidersFrom(HttpClientModule), // Ensure HttpClientModule is imported
    provideHttpClient(withInterceptors([authInterceptor])), // Register your interceptor
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
  ]
};
