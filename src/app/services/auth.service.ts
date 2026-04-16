import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { UserJson } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  userToken = signal('');

  login(email: string, password: string) {
    return this.http
      .get<UserJson[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((users: UserJson[]) => {
          const user = users.find((u) => u.password === password);
          return user ?? null;
        }),
      );
  }
}
