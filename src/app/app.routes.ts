import { Routes } from '@angular/router';
import { CatalogoProductos } from './modules/catalog/pages/catalogo-productos/catalogo-productos';
import { DetalleProducto } from './modules/catalog/pages/detalle-producto/detalle-producto';

export const routes: Routes = [
    {
        path: 'store',
        loadComponent: () => import('./modules/catalog/layout-store/layout-store').then(m => m.LayoutStore),
        children: [
            { path: '', redirectTo: 'catalog', pathMatch: 'full' },
            { path: 'catalog', component: CatalogoProductos },
            { path: 'productdetail/:id', component: DetalleProducto },
            { path: '**', redirectTo: 'catalog', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'store', pathMatch: 'full' }
];
