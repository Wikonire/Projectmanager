import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhaseComponent } from './edit-phase.component';

describe('EditPhaseComponent', () => {
  let component: EditPhaseComponent;
  let fixture: ComponentFixture<EditPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPhaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
