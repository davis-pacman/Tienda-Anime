import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreDataService } from '../../../../core/services/store-data-service';

@Component({
  selector: 'app-support',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './support.html',
  styleUrl: './support.css',
})
export class Support {
  private readonly fb = inject(FormBuilder);
  private readonly storeDataService = inject(StoreDataService);

  supportForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required],
    prioridad: ['media', Validators.required],
  });

  enviado = false;

  submitTicket(): void {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }

    this.storeDataService.saveSupportTicket(this.supportForm.value).subscribe({
      next: () => {
        this.enviado = true;
        this.supportForm.reset({ prioridad: 'media' });
      },
      error: (err) => {
        console.error('Error al enviar ticket', err);
      },
    });
  }
}
