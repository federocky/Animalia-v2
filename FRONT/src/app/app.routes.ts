import { ArticuloCardTiendaComponent } from './components/tienda/articulo-card-tienda/articulo-card-tienda.component';
import { MainIndexComponent } from './components/index/main-index/main-index.component';
import { MainTiendaComponent } from './components/tienda/main-tienda/main-tienda.component';
import {RouterModule, Routes} from '@angular/router';


const APP_ROUTES: Routes = [
    { path: '', component: MainIndexComponent },
    { path: "index", component: MainIndexComponent },
    { path: "tienda", component: MainTiendaComponent },
    { path: "tienda/:id", component: ArticuloCardTiendaComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);