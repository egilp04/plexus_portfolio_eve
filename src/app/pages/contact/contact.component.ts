import { Component } from '@angular/core';
import { InputComponentComponent } from "../../components/input-component/input-component.component";

@Component({
  selector: 'app-contact',
  imports: [InputComponentComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
})
export class ContactComponent {}
