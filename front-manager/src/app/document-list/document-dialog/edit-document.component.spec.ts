import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentComponent } from './edit-document.component';

describe('DocumentDialogComponent', () => {
  let component: EditDocumentComponent;
  let fixture: ComponentFixture<EditDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
