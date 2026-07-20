import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Specification } from '../../../../core/model/specification.interface';
import { Product } from '../../../../core/model/product.interface';
import { ProductService } from '../../../../core/services/product-service';
import { CategoryService } from '../../../../core/services/category-service';
import { Category } from '../../../../core/model/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
})
export class NewProduct implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private formB = inject(FormBuilder);

  @Input() id!: string;

  categorias?: Category[];
  esEdicion: boolean = false; // Cambia a true si estás editando un producto existente

  public productForm: FormGroup = this.formB.group({
    id: [''],
    nombre: ['', [Validators.required]],
    slug: ['', [Validators.pattern('^[a-z0-9-]+$')]],
    categoria: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.required]],
    precioActual: [0, [Validators.required, Validators.min(0)]],
    precioAntes: [null, [Validators.min(0)]],
    esPersonalizado: [false],
    imagenUrl: ['', [Validators.required]],
    especificaciones: this.formB.array([])
  })

  ngOnInit(): void {
    console.log("ID recibido en el componente:", this.id);

    this.listarCategorias();

    if (this.id) {
      this.rellenarFormulario(this.id);
      console.log("rellenando formulario");
      this.esEdicion = true;
    }

    // Escucha cambios en el nombre para auto-generar un Slug amigable (opcional pero muy pro)
    this.productForm.get('nombre')?.valueChanges.subscribe(nombre => {
      if (!this.esEdicion) {
        const slugCalculado = nombre.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        this.productForm.get('slug')?.setValue(slugCalculado, { emitEvent: false });
      }
    });

  }

  listarCategorias() {
    this.categoryService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Error al obtener las categorias', err) }
    });
  }

  rellenarFormulario(id: string) {
    this.productService.getProductoById(id).subscribe({
      next: (data) => {
        console.log("Buscando producto")
        if (data == null) {
          console.log("no se encontro el producto")
          return;
        }

        const producto: Product = data;
        this.productForm.patchValue(producto);

        const especificacionesArray = this.productForm.get('especificaciones') as FormArray;

        // Limpiamos el array por si acaso
        especificacionesArray.clear();

        // 3. Iteramos sobre los datos recibidos y agregamos los controles al array
        if (data.especificaciones && Array.isArray(data.especificaciones)) {
          data.especificaciones.forEach((espec: any) => {
            especificacionesArray.push(this.formB.group({
              // Ajusta estos campos según la estructura real de tus especificaciones
              nombre: [espec.nombre || ''],
              valor: [espec.valor || '']
            }));
          });
        }

        this.cdr.detectChanges();
        console.log(producto);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  // Getter helper para acceder fácilmente al FormArray en el HTML
  get establecerEspecificacionesFormArray(): FormArray {
    return this.productForm.get('especificaciones') as FormArray;
  }

  // Alternativa para Angular 17/18 en el bucle @for
  get especificacionesFormArray() {
    return this.productForm.get('especificaciones') as FormArray;
  }

  // Añade un nuevo bloque vacío de especificación { nombre, valor }
  agregarEspecificacion(especificacion?: Specification): void {
    const grupo = this.formB.group({
      nombre: [especificacion ? especificacion.nombre : '', Validators.required],
      valor: [especificacion ? especificacion.valor : '', Validators.required]
    });
    (this.productForm.get('especificaciones') as FormArray).push(grupo);
  }

  // Elimina una fila de especificaciones por su índice
  eliminarEspecificacion(index: number): void {
    (this.productForm.get('especificaciones') as FormArray).removeAt(index);
  }

  // Dispara el evento de guardado
  guardarProducto(): void {
    if (this.productForm.invalid) return;

    // El objeto value ya tiene exactamente la forma de tu interfaz 'Product'
    const productoData: Product = this.productForm.value;

    console.log('Objeto Producto listo para enviar al Json Server:', productoData);

    if (!this.esEdicion) {
      this.productService.createProducto(productoData).subscribe({
        next: () => {
          this.router.navigate(['admin/listproducts']);
        },
        error: (err) => {
          console.error('Error al crear el producto:', err);
          alert('Hubo un error al intentar guardar el nuevo usuario.');
        }
      });
    } else {
      this.productService.updateProducto(this.id, productoData).subscribe({
        next: () => {
          this.router.navigate(['admin/listproducts'])
        },
        error: (err) => {
          console.error('Error al editar el producto:', err);
          alert('Hubo un error al intentar editar el nuevo usuario.');
        }
      });
    }

  }

  cancelar(): void {
    if (!this.esEdicion) {
      this.productForm.reset();
    } else {
      this.router.navigate(['admin/listproducts']);
    }

  }
}
