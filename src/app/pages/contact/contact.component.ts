import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslateModule, TitleCasePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.profileForm.invalid) {
      alert('hay campos invalidos');
      return;
    }
    alert('Enviado!!!');
  }
}
