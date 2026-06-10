import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EmailjsService } from '../../services/emailjs.service';
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslateModule, TitleCasePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);

  private emailService = inject(EmailjsService);

  contactForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      alert('Por favor, rellena todos los campos correctamente.');
      this.contactForm.markAllAsTouched();
      return;
    }
    const templateParams = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
    };
    this.emailService
      .enviarCorreo(templateParams)
      .then((response) => {
        console.log('¡ÉXITO!', response.status, response.text);
        alert('¡Mensaje enviado con éxito!');
        this.contactForm.reset();
      })
      .catch((error) => {
        console.error('ERROR AL ENVIAR...', error);
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      });
  }
}
