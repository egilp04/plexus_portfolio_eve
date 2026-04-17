import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'anioExperiencia',
})
export class AnioExperienciaPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) return '';

    const anioInicio = Number(value);
    const anioActual = new Date().getFullYear();
    const experiencia = anioActual - anioInicio;

    return `${experiencia}`;
  }
}
