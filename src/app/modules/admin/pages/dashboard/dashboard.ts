import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user-service';
import { User } from '../../../../core/model/user.interface';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];

  nUsuarios: number = 0;

  ngOnInit(): void {
    this.contarUsuarios();
  }

  contarUsuarios() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.nUsuarios = this.users.length;
        this.cdr.detectChanges();
      }, error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });


  }
}
