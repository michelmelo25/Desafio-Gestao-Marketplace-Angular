import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { Layout } from './pages/products/layout/layout';
import { NewProduct } from './pages/new-product/new-product';
import { authGuard } from './pages/guards/auth-guards';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: Layout,
        canActivateChild: [authGuard],
        children: [
            {
                path: 'products',
                component: Products
            },
            {
                path: 'new-product',
                component: NewProduct
            }
        ],
    },
    {
        path: '**',
        redirectTo: '/login'
    },
    
];
