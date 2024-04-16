import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Auth, User, signInWithEmailAndPassword } from "@angular/fire/auth";
import { GoogleAuthProvider, IdTokenResult, browserLocalPersistence, signInWithPopup } from 'firebase/auth';
import { from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: WritableSignal<User | undefined | null> = signal(undefined);
  public readonly user: Signal<User | undefined | null> = this._user.asReadonly();
  public readonly idToken: Signal<string | undefined> = toSignal(toObservable(this.user).pipe(
    switchMap(user => user ? from(user.getIdToken()) : of(undefined))),
  );

  private googleProvider = new GoogleAuthProvider();

  constructor(private firebaseAuth: Auth) {
    firebaseAuth.setPersistence(browserLocalPersistence);
    firebaseAuth.authStateReady().then(() => {
      this._user.set(firebaseAuth.currentUser);
    });
    firebaseAuth.onAuthStateChanged((user) => {
      this._user.set(user);

      // const setupComplete = (token: IdTokenResult) => token.claims["roles"];
      // user?.getIdTokenResult().then(async (tokenResult) => {
      //   let counter = 0;
      //   while (!setupComplete(tokenResult)) {
      //     console.info(`Setting up user account...(${counter++})`);
      //     tokenResult = await this.refreshToken(user);
      //     await new Promise(resolve => setTimeout(resolve, 500));
      //   }
      //   if (counter > 0) {
      //     window.location.reload();
      //   }
      // })

    });

    this.googleProvider.addScope("openid");
    this.googleProvider.addScope("email");
    this.googleProvider.addScope("profile");
  }

  private async refreshToken(user: User) {
    return await user.getIdTokenResult(true);
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.firebaseAuth, email, password)
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async loginGoogle() {
    try {
      await signInWithPopup(this.firebaseAuth, this.googleProvider);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async logout() {
    await this.firebaseAuth.signOut();
  }

}
