import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLayoutComponent } from './flight-layout.component';
import { Router, RouteReuseStrategy } from '@angular/router';

describe('FlightLayoutComponent', () => {
  let component: FlightLayoutComponent;
  let fixture: ComponentFixture<FlightLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Router],
      declarations: [FlightLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Orders Component', () => {
    component.onFlightOrdersClick();
    expect(component.enableFlightSchedule).toBe(false);
  });

  it('should navigate to Schedule Component', () => {
    component.onFlightScheduleClick();
    expect(component.enableFlightSchedule).toBe(true);
  });
});
