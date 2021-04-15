import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GozososPage } from './gozosos.page';

describe('GozososPage', () => {
  let component: GozososPage;
  let fixture: ComponentFixture<GozososPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GozososPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GozososPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
