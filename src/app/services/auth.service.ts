import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  initAuthListener(): void {
    authState(this.auth).subscribe((fuser: User | null) => console.log(fuser));
  }

  crearUsuario(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginUsuario(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  isAuth(): Observable<boolean> {
    return new Observable((subscriber) => {
      const unsubscribe = this.auth.onAuthStateChanged(subscriber);
      return { unsubscribe };
    }).pipe(map((fuser) => fuser !== null));
  }
}
