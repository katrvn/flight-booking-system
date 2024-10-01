import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOrdersComponent } from './flight-orders.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { APP_CONFIG } from '../../model/appconfig';
import { FlightService } from '../../services/flight.service';
import { flightschedule } from '../../model/flightschedule';
import { flightorder } from '../../model/flightorder';
import { of } from 'rxjs';

const lstFlightSchedules: Array<flightschedule> = [
  { 
    flight_number: 1,
    departure_city: 'XYS',
    arrival_city: 'SYX',
    day : 1
  },
  {
    flight_number: 2,
    departure_city: 'XYZ',
    arrival_city: 'ZYX',
    day : 1
  }
];

const lstFlightOrders: Array<flightorder> = [
  { 
    order_name: "order-001",
    destination: "SYX"
  },
  {
    order_name: "order-002",
    destination: "ZYX"
  }
];

describe('FlightOrdersComponent', () => {
  let component: FlightOrdersComponent;
  let fixture: ComponentFixture<FlightOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightOrdersComponent],
      imports:[MatTableModule, HttpClientTestingModule],
      providers: [FlightService,
        provideHttpClientTesting,
        { provide: APP_CONFIG, useValue: { 
          mockDataFilePath: "\\assets\\mock-data\\",
          mockDataFileName  : {
              flightSchedule: "flights-schedule.json",
              flightOrders : "flights-orders.json"
          }}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all the orders', () => {
    let spy = spyOn(component['flightservice'], 'getAllFlightSchedules').and.returnValue(of(lstFlightSchedules));
    let spy2 = spyOn(component['flightservice'], 'getAllFlightOrders').and.returnValue(of(lstFlightOrders));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should throw error if service throws error', () => {
    const err = new Error();
    spyOn(component['flightservice'], 'getAllFlightSchedules').and.throwError(err);
    expect(() => {
      component.ngOnInit();
    }).toThrow(err);
  });

});
