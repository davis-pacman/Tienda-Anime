import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly categorySignal = signal<string>('');

  readonly categoryAtual = this.categorySignal.asReadonly();

  updateCategory(newCategory: string) {
    this.categorySignal.set(newCategory);
  }
}
