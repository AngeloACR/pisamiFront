import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  title: any;
  
  buscador: FormGroup
  constructor(
    private router: Router,
    ) { }

  ngOnInit() {
  this.buscador = new FormGroup({
      artista: new FormControl(''),
    });
  }
 
  endBuscador() {
    this.router.navigateByUrl('/buscador/0');
    this.buscador.reset();
  }
}
