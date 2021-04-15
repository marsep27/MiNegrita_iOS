import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjustesPerfilPage } from './ajustes-perfil.page';

describe('AjustesPerfilPage', () => {
  let component: AjustesPerfilPage;
  let fixture: ComponentFixture<AjustesPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjustesPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
