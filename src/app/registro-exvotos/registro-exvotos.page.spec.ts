import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroExvotosPage } from './registro-exvotos.page';

describe('RegistroExvotosPage', () => {
  let component: RegistroExvotosPage;
  let fixture: ComponentFixture<RegistroExvotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroExvotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroExvotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
