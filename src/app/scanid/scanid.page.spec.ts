import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanidPage } from './scanid.page';

describe('ScanidPage', () => {
  let component: ScanidPage;
  let fixture: ComponentFixture<ScanidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanidPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
