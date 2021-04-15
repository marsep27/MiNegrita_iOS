import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LuminososPage } from './luminosos.page';

describe('LuminososPage', () => {
  let component: LuminososPage;
  let fixture: ComponentFixture<LuminososPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuminososPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LuminososPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
