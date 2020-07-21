import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { BuscadorVideosComponent } from './components/buscador-videos/buscador-videos.component';
import { BuscadorCancionesComponent } from './components/buscador-canciones/buscador-canciones.component';
import { RestorePassComponent } from './components/restore-pass/restore-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
 {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
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
    path: 'restore',
    component: RestorePassComponent,
  },
  {
    path: 'buscador/:id',
    component: BuscadorComponent,
  },
  {
    path: 'politica/:id',
    component: PoliticaComponent,
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
  },
  {
    path: 'canciones',
    component: BuscadorCancionesComponent,
  },
  {
    path: 'videos',
    component: BuscadorVideosComponent,
  },
  {
    path: 'favoritos',
    component: FavoritosComponent,
  },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
