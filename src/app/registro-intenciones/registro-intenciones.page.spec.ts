import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroIntencionesPage } from './registro-intenciones.page';

describe('RegistroIntencionesPage', () => {
  let component: RegistroIntencionesPage;
  let fixture: ComponentFixture<RegistroIntencionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroIntencionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroIntencionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
