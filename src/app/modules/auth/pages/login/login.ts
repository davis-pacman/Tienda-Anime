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
  styleUrl: './login.css',
})
export class Login {
  private userService = inject(UserService)
  private authService = inject(AuthService);
  private router = inject(Router);
  private formB = inject(FormBuilder);

  public userLogin: FormGroup = this.formB.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]]
  });

  public userValid = signal<number>(0);
  public message = signal<string>("");

  iniciarSesion() {
    if (this.userLogin.invalid) {
      this.userLogin.markAllAsTouched();
      return;
    }
    const formUser = this.userLogin.value;

    const userData: User = {
      ...formUser
    }

    this.userService.getUserByCorreo(userData.correo).subscribe((usuarios) => {
      const usuarioValido = usuarios[0];

      if (usuarioValido) {
        console.log(usuarioValido);

        if (usuarioValido.contrasenia == userData.contrasenia) {


          this.userValid.set(0);
          this.message.set('');

          this.authService.establecerSesion(usuarioValido);

          this.router.navigate(['/store/home']);

        } else {
          this.userValid.set(2);
          this.message.set('Contraseña incorrecta')

        }
      } else {
        this.userValid.set(1);
        this.message.set('Correo no encontrado');
        return;
      }
    });
  }


  manejarLogin(correo: string, contraseña: string): void {
    if (correo && contraseña) {
      this.router.navigate(['/store/home']);
    }
  }
}
