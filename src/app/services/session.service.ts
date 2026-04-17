import { Injectable, signal } from '@angular/core';
import { UserJson } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  userSesion = signal<boolean>(!!localStorage.getItem('user_token'));
  userOnSessionEmail = signal<string>(localStorage.getItem('user_email') || '');
  userOfSession = signal<UserJson | null>(this.getStoredUser());

  constructor() {}

  private getStoredUser(): UserJson | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  iniciarSesion(user: UserJson, token: string) {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.userSesion.set(true);
    this.userOnSessionEmail.set(user.email);
    this.userOfSession.set(user);
  }

  cerrarSesion() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_data');
    this.userSesion.set(false);
    this.userOnSessionEmail.set('');
    this.userOfSession.set(null);
  }
}
