import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  boxOn: boolean;
  menuOn: number;
  prevMenu: number;

  user: any;
  isAdmin: boolean;
  isEmpleado: boolean;

  myMenu: any;
  adminMenu: any;
  empleadoMenu: any;

  constructor(
    private auth: AuthService
  ) {

  }

  ngOnInit() {

    this.user = this.auth.decode();
    this.isAdmin = (this.user.tipo === 'Admin');
    this.isEmpleado = (this.user.tipo === 'Empleado');
    this.setAdminMenu();
/*     if (this.isAdmin) {
    } else if (this.isEmpleado) {
      this.setEmpleadoMenu();
    }
 */  }

  /*   public appPages = [
      {
        name: 'Registro',
        link: '/registro',
        icon: 'mail'
      },
      {
        name: 'Iniciar sesión',
        link: '/login',
        icon: 'paper-plane'
      }
    ]; */

  setAdminMenu() {
    this.myMenu = [{
      name: 'MODULO ADMINISTRADOR',
      link: '/admin/0',
      icon: 'assets/MENU/MODULOADMINIS.png',
      id: 0,
      childs: [
        {
          name: 'REGISTRO DE USUARIOS',
          link: '/admin/0',
          id: 0,
          icon: 'assets/MENU/REGISTROUSU.png'
        }, {
          name: 'LISTA DE USUARIOS',
          link: '/admin/1',
          id: 1,
          icon: 'assets/MENU/LISTAUSU.png'
        }, {
          name: 'REGISTRO DE ARTISTAS',
          link: '/artistas/0',
          id: 2,
          icon: 'assets/MENU/REGISTROARTISTA.png'
        },
      ]
    },
    {
      name: 'VALIDACIÓN DE CUENTAS',
      link: '/artistas/1',
      id: 1,
      icon: 'assets/MENU/VALIDADCUENTA.png',
      childs: [
        {
          name: 'LISTA DE ARTISTAS',
          link: '/artistas/1',
          id: 0,
          icon: 'assets/MENU/LISTAARTISTA.png'
        }
      ]
    },
    {
      name: 'CONFIGURACIÒN',
      link: '/generos/0',
      id: 2,
      icon: 'assets/MENU/CONFIGURACION.png',
      childs: [
        {
          name: 'CREACIÓN DE GÉNERO',
          link: '/generos/0',
          id: 0,
          icon: 'assets/MENU/GUARDARGENERO.png'
        }, {
          name: 'LISTA DE GÉNEROS',
          link: '/generos/1',
          id: 1,
          icon: 'assets/MENU/LISTAGENEROS.png'
        }, {
          name: 'NOTIFICACIONES',
          link: '/notificaciones/0',
          id: 2,
          icon: 'assets/MENU/NOTIFICACIONES.png'
        },
        {
          name: 'LISTA DE NOTIFICACIONES',
          link: '/notificaciones/1',
          id: 3,
          icon: 'assets/MENU/LISTANOTIFICACIONES.png'
        }
      ]
    }, {
      name: 'POLÍTICAS',
      link: '/politicas/0',
      id: 3,
      icon: 'assets/MENU/POLITICAS.png'
    },
    {
      name: 'CERRAR SESIÓN',
      link: '/login',
      id: 4,
      icon: 'assets/MENU/CERRARSESION.png'
    }
    ];
  }


  setEmpleadoMenu() {

  }

  tMenu(event, item) {
    this.closeMenus();
    this.myMenu[item.id].class = {
      aBox: true,
    }
  }

  closeMenus() {
    this.myMenu.forEach(item => {
      item.class = {
        aBox: false,
      }
    });
  }

}
