import { OrderDetailsComponent } from './components/checkout/order-details/order-details.component';
import { GuestFormComponent } from './components/checkout/guest-form/guest-form.component';
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

    { path: "registro", component: RegisterComponent },
    { path: "login", component: LoginComponent },

    { path: "checkout/carrito", component: CartComponent },
    { path: "checkout/formulario_invitado", component: GuestFormComponent },
    { path: "checkout/details", component: OrderDetailsComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);