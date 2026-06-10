import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
@Injectable({
  providedIn: 'root',
})
export class EmailjsService {
  constructor() {}

  enviarCorreo(datosFormulario: any) {
    const serviceID = 'service_c2pii6u';
    const templateID = 'template_5ucefi5';
    const publicKey = 'QHVmY2xHRyND2kBoT';
    return emailjs.send(serviceID, templateID, datosFormulario, publicKey);
  }
}
