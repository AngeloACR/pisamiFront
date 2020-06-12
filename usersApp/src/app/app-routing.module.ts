import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { BuscadorVideosComponent } from './components/buscador-videos/buscador-videos.component';
import { BuscadorCancionesComponent } from './components/buscador-canciones/buscador-canciones.component';

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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
