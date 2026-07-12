import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../core/model/user.interface';
import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private formB = inject(FormBuilder);
  private userService = inject(UserService);

  public userForm: FormGroup = this.formB.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(7)]],
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]]
  });

  public validUser = signal<boolean>(true);

  register() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValues = this.userForm.value;

    const userData: User = {
      role: 'cliente',
      ...formValues

    };

    this.userService.getUserByCorreo(userData.correo).subscribe({
      next: (data) => {
        const otherUser = data.length;

        const userdb: User[] = data;

        if (otherUser > 0) {
          console.log("Usuario encontrado con este gmail", userdb)
          this.validUser.set(false);
          return;
        } else {
          this.validUser.set(true);
        }

        if (this.validUser) {
          console.log(this.validUser);
          this.userService.getUsers().subscribe({
            next: (usuarios) => {

              // 2. 🎯 CÁLCULO DEL ID MANUAL SIMULANDO AUTOINCREMENTAL
              // Si no hay usuarios, el primer ID será 1.
              // Si hay usuarios, buscamos el ID máximo usando Math.max y le sumamos 1.
              const nuevoId: number = usuarios.length > 0
                ? Math.max(...usuarios.map(u => Number(u.id))) + 1
                : 1;

              userData.id = String(nuevoId);
              console.log(userData);

              this.userService.createUser(userData).subscribe({
                next: () => {
                  this.router.navigate(['auth/login']);
                },
                error: (err) => {
                  console.error('Error al crear el usuario:', err);
                  alert('Hubo un error al intentar guardar el nuevo usuario.');
                }
              });

            },
            error: (err) => console.error('Error al obtener la lista de usuarios:', err)
          });
        }

      }
    });
  }

}
