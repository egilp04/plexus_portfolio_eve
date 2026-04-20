import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    TitleCasePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  profileForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{3,}$/,
        ),
      ],
    ],
  });

  onSubmit() {
    if (this.profileForm.invalid) {
      this.translate
        .get('AUTH.REGISTER.INVALID_FIELDS')
        .subscribe((res) => alert(res));
      return;
    }

    const formData = this.profileForm.getRawValue();
    const newUser = {
      name: formData.firstName,
      email: formData.email,
      password: formData.password,
    };

    this.authService.register(newUser).subscribe((res) => {
      this.translate.get(res.message).subscribe((mensajeTraducido) => {
        alert(mensajeTraducido);
        if (res.success) {
          this.profileForm.reset();
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
