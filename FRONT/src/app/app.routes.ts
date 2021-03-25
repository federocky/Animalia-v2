import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/checkout/cart/cart.component';
import { ArticuloCardTiendaComponent } from './components/tienda/articulo-card-tienda/articulo-card-tienda.component';
import { MainIndexComponent } from './components/index/main-index/main-index.component';
import { MainTiendaComponent } from './components/tienda/main-tienda/main-tienda.component';
import {RouterModule, Routes} from '@angular/router';


const APP_ROUTES: Routes = [
    { path: '', component: MainIndexComponent },
    { path: "index", component: MainIndexComponent },
    { path: "tienda", component: MainTiendaComponent },
    { path: "tienda/:id", component: ArticuloCardTiendaComponent },
    { path: "carrito", component: CartComponent },
    { path: "registro", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);