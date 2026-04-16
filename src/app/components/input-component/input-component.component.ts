import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-input-component',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './input-component.component.html',
  styleUrl: './input-component.component.scss',
  standalone: true,
})
export class InputComponentComponent {}
