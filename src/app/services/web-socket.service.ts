import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { WBS } from '../models/ws';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$: WebSocketSubject<WBS>;
  private status$ = new Subject<string>();

  constructor() {
    this.socket$ = webSocket<WBS>({
      url: 'ws://localhost:3002',
      openObserver: {
        next: () => {
          console.log('WebSocket abierto');
          this.status$.next('open');
        },
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket cerrado');
          this.status$.next('close');
        },
      },
    });
    this.socket$.subscribe({
      error: (err) => {
        console.error('WebSocket error:', err);
        this.status$.next('error');
      },
    });
  }

  listen(): Observable<WBS> {
    return this.socket$.asObservable();
  }

  send(msg: WBS) {
    this.socket$.next(msg);
  }

  onStatus(): Observable<string> {
    return this.status$.asObservable();
  }

  close() {
    this.socket$.complete();
  }
}
