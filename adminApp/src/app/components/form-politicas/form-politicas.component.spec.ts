import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormPoliticasComponent } from './form-politicas.component';

describe('FormPoliticasComponent', () => {
  let component: FormPoliticasComponent;
  let fixture: ComponentFixture<FormPoliticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPoliticasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
