import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReproductorPage } from './reproductor.page';

describe('ReproductorPage', () => {
  let component: ReproductorPage;
  let fixture: ComponentFixture<ReproductorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproductorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReproductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
