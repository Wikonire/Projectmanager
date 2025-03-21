import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownComponent } from './markdown.component';
import {MarkdownModule} from './markdown.module';

describe('MarkdownComponent', () => {
  let component: MarkdownComponent;
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
