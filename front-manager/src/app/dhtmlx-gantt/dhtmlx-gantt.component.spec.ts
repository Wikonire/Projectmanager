import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DhtmlxGanttComponent} from './dhtmlx-gantt.component';

describe('DhtmlxGanttComponent', () => {
  let component: DhtmlxGanttComponent;
  let fixture: ComponentFixture<DhtmlxGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhtmlxGanttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhtmlxGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
