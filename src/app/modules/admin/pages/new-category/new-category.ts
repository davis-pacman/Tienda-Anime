import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-category.html',
  styleUrl: './new-category.css',
})
export class NewCategory implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private formB = inject(FormBuilder);

  @Input() id!: string;

  esEdicion: boolean = false;

  public categoryForm: FormGroup = this.formB.group({
    nombre: ['', [Validators.required]],

  })

  ngOnInit() {
    if (this.id) {
      this.esEdicion = true;
      this.rellenarFormulario(this.id);
    }
  }

  rellenarFormulario(id: string) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        console.log("Buscando categoria")

        if (data == null) {
          console.log("no se encontro la categoria")
          return;
        }

        this.categoryForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  cancelar(): void {
    if (!this.esEdicion) {
      this.categoryForm.reset();
    } else {
      this.router.navigate(['admin/listcategorys']);
    }

  }

  guardar() {
    if (this.categoryForm.invalid) return;

    if (this.esEdicion && this.id) {
      this.categoryService.updateCategory(this.id, this.categoryForm.value).subscribe(() => {
        this.router.navigate(['/admin/listcategorys']);
      });
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.router.navigate(['/admin/listcategorys']);
      });
    }
  }
}
