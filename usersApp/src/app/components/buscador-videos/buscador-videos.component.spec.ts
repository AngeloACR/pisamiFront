import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscadorVideosComponent } from './buscador-videos.component';

describe('BuscadorVideosComponent', () => {
  let component: BuscadorVideosComponent;
  let fixture: ComponentFixture<BuscadorVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorVideosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
