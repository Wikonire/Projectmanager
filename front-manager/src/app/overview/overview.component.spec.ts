import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';

interface OverviewTest {
  id: number;
  name: string;
}
describe('OverviewComponent', () => {
  let component: OverviewComponent<OverviewTest>;
  let fixture: ComponentFixture<OverviewComponent<OverviewTest>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewComponent<OverviewTest>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
