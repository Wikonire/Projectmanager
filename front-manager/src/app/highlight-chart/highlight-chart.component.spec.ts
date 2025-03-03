import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightChartComponent } from './highlight-chart.component';

describe('HighlightChartComponent', () => {
  let component: HighlightChartComponent;
  let fixture: ComponentFixture<HighlightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
