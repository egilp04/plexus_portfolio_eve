import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserJson } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserJsonServerService {
  private apiUrl = 'http://localhost:3000/users';
  private http = inject(HttpClient);

  getUsersJson(): Observable<UserJson[]> {
    return this.http.get<UserJson[]>(this.apiUrl);
  }
}
