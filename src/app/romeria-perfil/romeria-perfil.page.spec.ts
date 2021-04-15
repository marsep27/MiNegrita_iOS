import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RomeriaPerfilPage } from './romeria-perfil.page';

describe('RomeriaPerfilPage', () => {
  let component: RomeriaPerfilPage;
  let fixture: ComponentFixture<RomeriaPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RomeriaPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RomeriaPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
