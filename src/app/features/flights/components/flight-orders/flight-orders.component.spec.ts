import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOrdersComponent } from './flight-orders.component';

describe('FlightOrdersComponent', () => {
  let component: FlightOrdersComponent;
  let fixture: ComponentFixture<FlightOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
