import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscadorCancionesComponent } from './buscador-canciones.component';

describe('BuscadorCancionesComponent', () => {
  let component: BuscadorCancionesComponent;
  let fixture: ComponentFixture<BuscadorCancionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorCancionesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
