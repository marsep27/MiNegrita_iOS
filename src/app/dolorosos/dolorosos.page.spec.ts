import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DolorososPage } from './dolorosos.page';

describe('DolorososPage', () => {
  let component: DolorososPage;
  let fixture: ComponentFixture<DolorososPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolorososPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DolorososPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
