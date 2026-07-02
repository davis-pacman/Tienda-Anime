import { Routes } from '@angular/router';
import { DetailProduct } from './modules/store/pages/detail-product/detail-product';
import { Home } from './modules/store/pages/home/home';
import { Filters } from './modules/store/pages/catalog/filters/filters';
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
            { path: 'productdetail/:id', component: DetailProduct },
            { path: 'cart', loadComponent: () => import('./modules/store/pages/cart/cart').then(m => m.Cart) },
            { path: 'checkout', loadComponent: () => import('./modules/store/pages/checkout/checkout').then(m => m.Checkout) },
            { path: 'checkout/success/:orderId', loadComponent: () => import('./modules/store/pages/checkout-success/checkout-success').then(m => m.CheckoutSuccess) },
            { path: 'support', loadComponent: () => import('./modules/store/pages/support/support').then(m => m.Support) },
            { path: 'blog', loadComponent: () => import('./modules/store/pages/blog/blog').then(m => m.Blog) },
            { path: 'blog/:slug', loadComponent: () => import('./modules/store/pages/blog-post/blog-post').then(m => m.BlogPost) },
            { path: 'terms', loadComponent: () => import('./modules/store/pages/terms/terms').then(m => m.Terms) },
            { path: '**', redirectTo: 'catalog', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/pages/error404-page/error404-page').then(m => m.Error404Page)
    }
];
