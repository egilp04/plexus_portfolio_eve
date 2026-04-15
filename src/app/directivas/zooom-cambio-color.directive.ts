import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appZooomCambioColor]',
})
export class ZooomCambioColorDirective {
  constructor(private el: ElementRef) {}
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
    this.el.nativeElement.style.transform = 'scale(1.2)';
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.transform = null;
  }
}
