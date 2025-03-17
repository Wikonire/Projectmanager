import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HomeModule} from './home.module';
import {OverviewModule} from '../overview/overview.module';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {ApprovalModule} from '../approval/approval.module';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        OverviewModule,
        BrowserDynamicTestingModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        ApprovalModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
