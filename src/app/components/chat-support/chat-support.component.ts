import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-support.component.html',
  styleUrl: './chat-support.component.scss',
})
export class ChatSupportComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chatBox') chatBox!: ElementRef;
  @ViewChild('chatFab') chatFab!: ElementRef;

  isOpen = false;
  message = '';
  messages: string[] = [];

  constructor(private ws: WebSocketService) {}

  ngAfterViewInit(): void {
    this.initMouseFollow();
    this.listenMessages();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;

    gsap.to(this.chatBox.nativeElement, {
      opacity: this.isOpen ? 1 : 0,
      scale: this.isOpen ? 1 : 0.95,
      y: this.isOpen ? 0 : 20,
      duration: 0.3,
      ease: 'power3.out',
    });
  }

  sendMessage(e: Event) {
    e.preventDefault();
    if (!this.message.trim()) return;

    this.ws.send({
      type: 'chat',
      payload: this.message,
    });

    this.messages.push('Tú: ' + this.message);
    this.message = '';
  }

  listenMessages() {
    this.ws.listen().subscribe((msg) => {
      if (msg.type === 'chat' || msg.type === 'notificacion') {
        this.messages.push('Soporte: ' + msg.payload);
      }
    });
  }

  initMouseFollow() {
    const setX = gsap.quickSetter(this.chatFab.nativeElement, 'x', 'px');

    window.addEventListener('mousemove', (e) => {
      setX((e.clientX - window.innerWidth) * 0.01);
    });
  }

  ngOnDestroy(): void {
    this.ws.close();
  }
}
