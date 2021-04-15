import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevocionarioPage } from './devocionario.page';

describe('DevocionarioPage', () => {
  let component: DevocionarioPage;
  let fixture: ComponentFixture<DevocionarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevocionarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevocionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
