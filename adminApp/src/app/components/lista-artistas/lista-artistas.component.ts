import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-lista-artistas',
  templateUrl: './lista-artistas.component.html',
  styleUrls: ['./lista-artistas.component.scss'],
})
export class ListaArtistasComponent implements OnInit {

  artistas: any;
  fields: any;
  buscarArtista: FormGroup;

  constructor() { }

  ngOnInit() {
    this.artistas = [{
      id: '2587956',
      nombre: 'Los Bacanos',
      categorias: 'Bachata, cumbia, salsa',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
    }, {
      id: '8587956',
      nombre: 'Los cantautores',
      categorias: 'Reggaeton, rock, metal',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
    }];
    this.fields = [
      'Id', 'Nombre', 'Teléfono', 'Correo'
    ];       
    this.initForm();
  }

  initForm() {
    this.buscarArtista = new FormGroup({
      nombre: new FormControl(''),
      genero: new FormControl(''),
    });
  
  }

  filtrarArtista() {
  }

  habilitarArtista(event){
    
  }

  editarArtista(event){
    
  }

  eliminarArtista(event){
    
  }

}
