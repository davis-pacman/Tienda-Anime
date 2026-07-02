import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styles: ``,
})
export class Register {
  private router = inject(Router);

  manejarRegistro(nombre: string, correo: string, contraseña: string): void {
    if (nombre && correo && contraseña) {
      this.router.navigate(['/auth/login']);
    }
  }
}
