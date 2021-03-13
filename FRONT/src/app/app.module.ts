import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

//RUTAS
import { app_routing } from './app.routes';


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
    MainIndexComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
