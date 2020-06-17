import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FormArtistasComponent } from './components/form-artistas/form-artistas.component';
import { FormNotificacionesComponent } from './components/form-notificaciones/form-notificaciones.component';
import { FormPoliticasComponent } from './components/form-politicas/form-politicas.component';
import { FormGenerosComponent } from './components/form-generos/form-generos.component';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ListaArtistasComponent } from './components/lista-artistas/lista-artistas.component';
import { ListaGenerosComponent } from './components/lista-generos/lista-generos.component';
import { ListaNotificacionesComponent } from './components/lista-notificaciones/lista-notificaciones.component';
import { ListaPoliticasComponent } from './components/lista-politicas/lista-politicas.component';
import { LoginComponent } from './components/login/login.component';
import { ValidacionComponent } from './components/validacion/validacion.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
 {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'registrousuarios',
    component: FormUsuariosComponent,
  },
  {
    path: 'listausuarios',
    component: ListaUsuariosComponent,
  },
  {
    path: 'registroartistas',
    component: FormArtistasComponent,
  },
  {
    path: 'listaartistas',
    component: ListaArtistasComponent,
  },
  {
    path: 'creageneros',
    component: FormGenerosComponent,
  },
  {
    path: 'listageneros',
    component: ListaGenerosComponent,
  },
  {
    path: 'registronotificaciones',
    component: FormNotificacionesComponent,
  },
  {
    path: 'listanotificaciones',
    component: ListaNotificacionesComponent,
  },
  {
    path: 'politicas',
    component: FormPoliticasComponent,
  },
  {
    path: 'listapoliticas',
    component: ListaPoliticasComponent,
  },
  {
    path: 'validacion',
    component: ValidacionComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
