import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { ArtistasComponent } from "./components/artistas/artistas.component";
import { GenerosComponent } from "./components/generos/generos.component";
import { NotificacionesComponent } from "./components/notificaciones/notificaciones.component";
import { PoliticasComponent } from "./components/politicas/politicas.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";

const routes: Routes = [
  {
    path: "registro/:id",
    component: RegistroComponent
  },
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "artistas/:id",
    component: ArtistasComponent
  },
  {
    path: "generos/:id",
    component: GenerosComponent
  },
  {
    path: "notificaciones/:id",
    component: NotificacionesComponent
  },
  {
    path: "politicas/:id",
    component: PoliticasComponent
  },
  {
    path: "usuarios/:id",
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
