import { Routes } from '@angular/router';
import { DetailProduct } from './modules/store/pages/detail-product/detail-product';
import { Home } from './modules/store/pages/home/home';
import { Filters } from './modules/store/pages/catalog/filters/filters';
import path from 'path';
import { Login } from './modules/auth/pages/login/login';
import { Register } from './modules/auth/pages/register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'store/home',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadComponent: () => import('./modules/auth/layout-auth/layout-auth').then(m => m.LayoutAuth),
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Login },
            { path: 'register', component: Register }
        ]
    },
    {
        path: 'store',
        loadComponent: () => import('./modules/store/layout-store/layout-store').then(m => m.LayoutStore),
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
            { path: 'catalog', component: Filters },
            { path: 'productdetail/:slug', component: DetailProduct },
            { path: '**', redirectTo: 'catalog', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/pages/error404-page/error404-page').then(m => m.Error404Page)
    }
];
