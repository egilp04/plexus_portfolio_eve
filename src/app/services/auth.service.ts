import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { UserJson } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly DB_KEY = 'portfolio_users_db';
  userToken = signal('');

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    const db = localStorage.getItem(this.DB_KEY);
    if (!db) {
      const defaultUsers: UserJson[] = [
        {
          id: 1,
          name: 'Juan Jesus',
          email: 'juan_jesus@gmail.com',
          password: '456',
          token: 'JJ-token',
          rol: 'usuario',
        },
        {
          id: 2,
          name: 'Eve',
          email: 'eve@gmail.com',
          password: '123',
          token: 'eve-token',
          rol: 'admin',
        },
      ];
      localStorage.setItem(this.DB_KEY, JSON.stringify(defaultUsers));
    }
  }

  private getUsers(): UserJson[] {
    const db = localStorage.getItem(this.DB_KEY);
    return db ? JSON.parse(db) : [];
  }

  login(email: string, password: string): Observable<UserJson | null> {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    return of(user ?? null);
  }

  register(
    newUser: Partial<UserJson>,
  ): Observable<{ success: boolean; message: string; user?: UserJson }> {
    const users = this.getUsers();
    if (users.find((u) => u.email === newUser.email)) {
      return of({ success: false, message: 'AUTH.REGISTER.EMAIL_EXISTS' }).pipe(
        delay(500),
      );
    }
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const finalUser: UserJson = {
      id: newId,
      name: newUser.name || 'Nuevo Usuario',
      email: newUser.email!,
      password: newUser.password!,
      token: `token-${new Date().getTime()}`,
      rol: 'usuario',
    };
    users.push(finalUser);
    localStorage.setItem(this.DB_KEY, JSON.stringify(users));
    return of({
      success: true,
      message: 'AUTH.REGISTER.SUCCESS',
      user: finalUser,
    }).pipe(delay(500));
  }
}
