import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AngularGanttComponent} from './angular-gantt.component';

describe('AngularGanttComponent', () => {
  let component: AngularGanttComponent;
  let fixture: ComponentFixture<AngularGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularGanttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
