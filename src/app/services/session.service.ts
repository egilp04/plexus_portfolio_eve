import { Injectable, signal } from '@angular/core';
import { UserJson } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}
  userSesion = signal(false);
  userOnSessionEmail = signal('');
  userOfSession = signal<UserJson | null>(null);
}
