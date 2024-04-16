import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [mockAuthProvider]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export const mockAuthProvider = {
  provide: Auth,
  useValue: jasmine.createSpyObj('Auth', {
    setPersistence: Promise.resolve(),
    authStateReady: Promise.resolve(),
    onAuthStateChanged: Promise.resolve(),
    getIdTokenResult: Promise.resolve()
  })
};