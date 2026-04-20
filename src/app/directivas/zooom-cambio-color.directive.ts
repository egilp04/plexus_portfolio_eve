import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appZooomCambioColor]',
})
export class ZooomCambioColorDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition =
      'background-color 0.3s ease, transform 0.6s ease';
  }
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
    this.el.nativeElement.style.transform = 'scale(1.04)';
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.transform = null;
  }
}
