import { UserAppointmentsComponent } from './components/user/user-appointments/user-appointments.component';
import { PasarelaAppointmentsComponent } from './components/services-appointments/pasarela-appointments/pasarela-appointments.component';
import { PeluqueriaComponent } from './components/services-appointments/peluqueria/peluqueria.component';
import { PaseosComponent } from './components/services-appointments/paseos/paseos.component';
import { UsersCrudComponent } from './components/admin/pages/users-crud/users-crud.component';
import { ProductsCrudComponent } from './components/admin/pages/products-crud/products-crud.component';
import { AdminOrdersComponent } from './components/admin/pages/orders/admin-orders.component';
import { TodoComponent } from './components/admin/pages/todo/todo.component';
import { UserSideComponent } from './components/main-user/user-side-component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { OrdersComponent } from './components/user/orders/orders.component';
import { MainUserComponent } from './components/user/main-user/main-user.component';
import { PasarelaComponent } from './components/checkout/pasarela/pasarela.component';
import { OrderDetailsComponent } from './components/checkout/order-details/order-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/checkout/cart/cart.component';
import { ArticuloCardTiendaComponent } from './components/tienda/articulo-card-tienda/articulo-card-tienda.component';
import { MainIndexComponent } from './components/index/main-index/main-index.component';
import { MainTiendaComponent } from './components/tienda/main-tienda/main-tienda.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AddressComponent } from './components/user/address/address.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { AdminLoginComponent } from './components/admin/login/admin-login.component';



const APP_ROUTES: Routes = [
    { path: 'main', component: UserSideComponent, children: [
        { path: "index", component: MainIndexComponent },
        { path: "tienda", component: MainTiendaComponent },
        { path: "tienda/:id", component: ArticuloCardTiendaComponent },


        { path: "registro", component: RegisterComponent },
        { path: "login", component: LoginComponent },

        { path: "checkout/carrito", component: CartComponent },
        { path: "checkout/detalles", component: OrderDetailsComponent, canActivate: [AuthGuard] },
        { path: "checkout/pasarela", component: PasarelaComponent, canActivate: [AuthGuard] },

        { path: "paseos", component: PaseosComponent },
        { path: "peluqueria", component: PeluqueriaComponent },
        { path: "servicios/pasarela", component: PasarelaAppointmentsComponent },

        { path: "usuario", component: MainUserComponent, children: [
            { path: "pedidos", component: OrdersComponent },
            { path: "configuracion", component: SettingsComponent },
            { path: "direccion", component: AddressComponent },
            { path: "citas", component: UserAppointmentsComponent }
        ] },

        { path: '**', pathMatch: 'full', redirectTo: 'index' }
    ] },





    { path: "admin/login", component: AdminLoginComponent},
    { path: "admin", component: MainAdminComponent, children: [

        {path: "todo", component: TodoComponent},
        {path: "pedidos", component: AdminOrdersComponent},
        {path: "productos", component: ProductsCrudComponent},
        {path: "usuarios", component: UsersCrudComponent},

        { path: '**', pathMatch: 'full', redirectTo: 'todo' }
    ] },






    { path: '**', pathMatch: 'full', redirectTo: 'main' }

];

export const app_routing = RouterModule.forRoot(APP_ROUTES);
