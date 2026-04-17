import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { DatosSelectModel } from '../../models/datosSelectModel';

@Component({
  selector: 'app-select-component',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './select-component.component.html',
  styleUrl: './select-component.component.scss',
  standalone: true,
})
export class SelectComponentComponent {
  @Input() datos: DatosSelectModel[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  onSelect(event: MatSelectChange) {
    const value = event.value ?? '';
    this.selectionChange.emit(value);
  }
}
