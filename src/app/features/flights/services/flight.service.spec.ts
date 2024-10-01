import { TestBed } from '@angular/core/testing';

import { FlightService } from './flight.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { APP_CONFIG } from '../model/appconfig';
import { flightorder } from '../model/flightorder';
import { flightschedule } from '../model/flightschedule';

const appConfig = {
    mockDataFilePath: "https:\\example.com\\assets\\mock-data\\",
    mockDataFileName  : {
        flightSchedule: "flights-schedule.json",
        flightOrders : "flights-orders.json"
    }
};

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

describe('FlightServiceService', () => {
  let service: FlightService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [FlightService,
        provideHttpClientTesting,
        { provide: APP_CONFIG, useValue: appConfig }
      ]
    });
    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllFlightSchedules() - should return expected result', () => {
    httpController = TestBed.inject(HttpTestingController);

    service.getAllFlightSchedules().subscribe((res) => {
      expect(res).toEqual(lstFlightSchedules);
    });

    const req = httpController.expectOne(
      `${appConfig.mockDataFilePath}${appConfig.mockDataFileName.flightSchedule}`
    );

    expect(req.request.method).toBe('GET');
    req.flush(lstFlightSchedules);
  });
});
