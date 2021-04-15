import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContinuarRomeriaPage } from './continuar-romeria.page';

describe('ContinuarRomeriaPage', () => {
  let component: ContinuarRomeriaPage;
  let fixture: ComponentFixture<ContinuarRomeriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinuarRomeriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContinuarRomeriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
