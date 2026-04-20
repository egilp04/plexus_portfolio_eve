import { ElementRef } from '@angular/core';
import { ZooomCambioColorDirective } from './zooom-cambio-color.directive';

describe('ZooomCambioColorDirective', () => {
  it('should create an instance', () => {
    // 1. Creamos un "simulacro" de ElementRef
    const mockElementRef = new ElementRef(document.createElement('div'));

    // 2. Se lo pasamos al constructor
    const directive = new ZooomCambioColorDirective(mockElementRef);

    expect(directive).toBeTruthy();
  });
});
