import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { TitleCasePipe } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    TitleCasePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private sessionService = inject(SessionService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  profileForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.profileForm.invalid) {
      this.translate
        .get('AUTH.LOGIN.INVALID_FIELDS')
        .subscribe((res) => alert(res));
      return;
    }

    this.authService
      .login(
        this.profileForm.controls.firstName.value,
        this.profileForm.controls.password.value,
      )
      .subscribe((res) => {
        if (!res) {
          this.translate
            .get('AUTH.LOGIN.ERROR')
            .subscribe((mensajeTraducido) => {
              alert(mensajeTraducido);
            });
          return;
        }
        this.sessionService.iniciarSesion(res, res.token);
        this.profileForm.reset();
        this.router.navigate(['/home']);
      });
  }
}
