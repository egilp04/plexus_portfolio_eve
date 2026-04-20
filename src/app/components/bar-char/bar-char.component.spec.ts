import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCharComponent } from './bar-char.component';
import { TranslateModule } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';

describe('BarCharComponent', () => {
  let component: BarCharComponent;
  let fixture: ComponentFixture<BarCharComponent>;

  beforeAll(() => {
    Chart.register(...registerables);
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarCharComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BarCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
