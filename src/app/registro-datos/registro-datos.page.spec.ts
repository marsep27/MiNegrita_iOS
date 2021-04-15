import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroDatosPage } from './registro-datos.page';

describe('RegistroDatosPage', () => {
  let component: RegistroDatosPage;
  let fixture: ComponentFixture<RegistroDatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
