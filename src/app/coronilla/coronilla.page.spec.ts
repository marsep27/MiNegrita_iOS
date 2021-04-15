import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoronillaPage } from './coronilla.page';

describe('CoronillaPage', () => {
  let component: CoronillaPage;
  let fixture: ComponentFixture<CoronillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoronillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
