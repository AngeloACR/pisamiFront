import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ListaArtistasComponent } from './components/lista-artistas/lista-artistas.component';
import { ListaGenerosComponent } from './components/lista-generos/lista-generos.component';
import { ListaNotificacionesComponent } from './components/lista-notificaciones/lista-notificaciones.component';
import { ListaPoliticasComponent } from './components/lista-politicas/lista-politicas.component';
import { LoginComponent } from './components/login/login.component';
import { ValidacionComponent } from './components/validacion/validacion.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { RegistroArtistasComponent } from './components/registro-artistas/registro-artistas.component';
import { RegistroGenerosComponent } from './components/registro-generos/registro-generos.component';
import { RegistroNotificacionesComponent } from './components/registro-notificaciones/registro-notificaciones.component';
import { RegistroPoliticasComponent } from './components/registro-politicas/registro-politicas.component';
import { RestorePassComponent } from './components/restore-pass/restore-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';

const routes: Routes = [
 {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'reset',
    component: ResetPassComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'registrousuarios',
    component: RegistroUsuariosComponent,
  },
  {
    path: 'listausuarios',
    component: ListaUsuariosComponent,
  },
  {
    path: 'registroartistas',
    component: RegistroArtistasComponent,
  },
  {
    path: 'listaartistas',
    component: ListaArtistasComponent,
  },
  {
    path: 'creageneros',
    component: RegistroGenerosComponent,
  },
  {
    path: 'listageneros',
    component: ListaGenerosComponent,
  },
  {
    path: 'notificaciones',
    component: RegistroNotificacionesComponent,
  },
  {
    path: 'listanotificaciones',
    component: ListaNotificacionesComponent,
  },
  {
    path: 'politicas',
    component: RegistroPoliticasComponent,
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
