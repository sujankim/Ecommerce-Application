import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authGuard } from './_auth/auth-guard';
import { ProductResolveService } from './_resolver/product-resolve';
import {BuyProductResolverService} from './_resolver/buy-product-resolver';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./admin/admin').then(m => m.Admin)
  },

  {
    path: 'user',
    canActivate: [authGuard],
    data: { roles: ['USER'] },
    loadComponent: () =>
      import('./user/user').then(m => m.User)
  },

  { path: 'login', component: Login },

  {
    path: 'forbidden',
    loadComponent: () =>
      import('./forbidden/forbidden').then(m => m.Forbidden)
  },

  {
    path: 'addNewProduct',
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },
    resolve: {
      product: ProductResolveService
    },
    loadComponent: () =>
      import('./add-new-product/add-new-product').then(m => m.AddNewProduct)
  },

  {
    path: 'viewProduct/:id',
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'USER'] },
    loadComponent: () =>
      import('./add-new-product/add-new-product').then(m => m.AddNewProduct)
  },

  {
    path: 'showProductDetails',
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./show-product-details/show-product-details').then(m => m.ShowProductDetails)
  },

  {
    path: 'productViewDetails',
    resolve: {
      product: ProductResolveService
    },
    loadComponent: () =>
      import('./product-view-details/product-view-details').then(m => m.ProductViewDetails)
  },

  {
    path: 'buyProduct',
    canActivate: [authGuard],
    data: { roles: ['USER'] },
    resolve: {
      productDetails: BuyProductResolverService
    },
    loadComponent: () =>
      import('./buy-product/buy-product').then(m => m.BuyProduct)
  },
];
