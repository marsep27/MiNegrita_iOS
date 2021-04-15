import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonacionPage } from './donacion.page';

describe('DonacionPage', () => {
  let component: DonacionPage;
  let fixture: ComponentFixture<DonacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
