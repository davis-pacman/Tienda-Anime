import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { UserService } from '../../../../core/services/user-service';
import { User } from '../../../../core/model/user.interface';

@Component({
  selector: 'app-account-configuration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-configuration.html',
})
export class AccountConfiguration implements OnInit {

  private authService = inject(AuthService);
  private formB = inject(FormBuilder);
  private userService = inject(UserService);

  public user = this.authService.currentUser;
  
  public orders = signal<Order[]>([]);
  public loadingOrders = signal<boolean>(true);

  private userEffect = effect(() => {
    const currentUser = this.user();
    if (currentUser?.correo) {
      this.fetchOrders(currentUser.correo);
    } else {
      this.loadingOrders.set(false);
    }
  });

  ngOnInit(): void {
    // handled by effect
  }

  fetchOrders(correo: string) {
    this.storeDataService.getOrdersByEmail(correo).subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loadingOrders.set(false);
      },
      error: (err) => {
        console.error('Error fetching orders', err);
        this.loadingOrders.set(false);
      }
    });
  }

  public userForm: FormGroup = this.formB.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(7)]],
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]]
  });

  ngOnInit(): void {
    this.loadUserData();
  }


  // 2. Cargar datos del usuario y asignarlos al formulario
  loadUserData() {
    // Suponiendo que tienes un método que trae el usuario actual
    const userData: User | null = this.user();

    if (userData) {
      // patchValue llena el formulario automáticamente
      this.userForm.patchValue(userData)
    }
  }

  // 3. Método para guardar
  guardarCambios() {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;

      const updatedData: User = {
        role: this.user()?.role,
        ...formValues
      };

      this.userService.updateUser(this.user()?.id, updatedData).subscribe({
        next: () => {
          alert('Perfil actualizado con éxito');
          this.authService.establecerSesion(updatedData);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
        }
      });
    }
  }
}