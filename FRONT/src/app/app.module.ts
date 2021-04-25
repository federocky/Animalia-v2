import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header/header.component';
import { NavBarComponent } from './components/shared/header/nav-bar/nav-bar.component';
import { CarroComponent } from './components/shared/header/carro/carro.component';
import { FooterComponent } from './components/shared/footer/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavMovilComponent } from './components/shared/header/nav-movil/nav-movil.component';
import { MenuUserComponent } from './components/shared/header/menu-user/menu-user.component';
import { SliderComponent } from './components/shared/slider/slider.component';
import { MainTiendaComponent } from './components/tienda/main-tienda/main-tienda.component';
import { FiltrosTiendaComponent } from './components/tienda/filtros-tienda/filtros-tienda.component';
import { ArticulosTiendaComponent } from './components/tienda/articulos-tienda/articulos-tienda.component';
import { ArticuloCardTiendaComponent } from './components/tienda/articulo-card-tienda/articulo-card-tienda.component';
import { HttpClientModule } from '@angular/common/http';
import { MainIndexComponent } from './components/index/main-index/main-index.component';

//FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//RUTAS
import { app_routing } from './app.routes';

//PAGINACION
import {NgxPaginationModule} from 'ngx-pagination';

//para el [(ngModel)]
import { CartComponent } from './components/checkout/cart/cart.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { OrderDetailsComponent } from './components/checkout/order-details/order-details.component';
import { AddressFormComponent } from './components/shared/address-form/address-form.component';
import { PasarelaComponent } from './components/checkout/pasarela/pasarela.component';
import { MainUserComponent } from './components/user/main-user/main-user.component';
import { OrdersComponent } from './components/user/orders/orders.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { AddressComponent } from './components/user/address/address.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { AdminLoginComponent } from './components/admin/login/admin-login.component'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    CarroComponent,
    FooterComponent,
    NavMovilComponent,
    MenuUserComponent,
    SliderComponent,
    MainTiendaComponent,
    FiltrosTiendaComponent,
    ArticulosTiendaComponent,
    ArticuloCardTiendaComponent,
    MainIndexComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    OrderDetailsComponent,
    AddressFormComponent,
    PasarelaComponent,
    MainUserComponent,
    OrdersComponent,
    SettingsComponent,
    AddressComponent,
    MainAdminComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    app_routing,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
