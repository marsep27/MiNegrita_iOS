import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RomeriaPage } from './romeria.page';

describe('RomeriaPage', () => {
  let component: RomeriaPage;
  let fixture: ComponentFixture<RomeriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RomeriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RomeriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
