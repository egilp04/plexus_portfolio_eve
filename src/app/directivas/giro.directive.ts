import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGiro]',
})
export class GiroDirective {
  constructor(private el: ElementRef) {}
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.transform = 'rotate(5deg)';
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.transform = null;
  }
}
