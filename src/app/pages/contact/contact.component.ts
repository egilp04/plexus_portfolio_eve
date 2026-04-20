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
  contactForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(4)]],
  });
  onSubmit() {
    if (this.contactForm.invalid) {
      alert('hay campos invalidos');
      return;
    }
    alert('Enviado!!!');
    this.contactForm.reset();
  }
}
