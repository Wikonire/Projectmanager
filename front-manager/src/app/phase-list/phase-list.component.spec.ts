import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseListComponent } from './phase-list.component';
import {PhaseListModule} from './phase-list.module';

describe('PhaseListComponent', () => {
  let component: PhaseListComponent;
  let fixture: ComponentFixture<PhaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhaseListComponent],
      imports: [
        PhaseListModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
