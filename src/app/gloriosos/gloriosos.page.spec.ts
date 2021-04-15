import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GloriososPage } from './gloriosos.page';

describe('GloriososPage', () => {
  let component: GloriososPage;
  let fixture: ComponentFixture<GloriososPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloriososPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GloriososPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
