import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service';
import { UserService } from '../../../../core/services/user-service';
import { User } from '../../../../core/model/user.interface';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly userService = inject(UserService)
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formB = inject(FormBuilder);

  public userLogin: FormGroup = this.formB.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]]
  });

  public userValid = signal<number>(0);

  iniciarSesion() {
    if (this.userLogin.invalid) {
      this.userLogin.markAllAsTouched();
      return;
    }

    const userData = this.userLogin.value;

    this.userService.getUserByCorreo(userData.correo).subscribe((usuarios) => {
      const usuarioValido = usuarios[0];

      if (usuarioValido) {
        console.log(usuarioValido);

        if (usuarioValido.contrasenia == userData.contrasenia) {


          this.userValid.set(0);

          this.authService.establecerSesion(usuarioValido);

          this.router.navigate(['/store/home']);

        } else {
          this.userValid.set(2);

        }
      } else {
        this.userValid.set(1);
      }
    });
  }

}
