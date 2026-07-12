import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  public currentUser = signal<User | null>(
    isPlatformBrowser(this.platformId)
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null
  );

  establecerSesion(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUser.set(user);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.currentUser.set(null);
  }
}

