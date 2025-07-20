import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component:HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: HomeComponent }
];
