import { ComponentFixture, flush, TestBed } from '@angular/core/testing';

import { FlightScheduleComponent } from './flight-schedule.component';
import { FlightService } from '../../services/flight.service';
import { Component, inject } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { flightschedule } from '../../model/flightschedule';
import { of, throwError } from 'rxjs';
import { APP_CONFIG } from '../../model/appconfig';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

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

describe('FlightScheduleComponent', () => {
  let component: FlightScheduleComponent;
  let fixture: ComponentFixture<FlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightScheduleComponent],
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

    fixture = TestBed.createComponent(FlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all the flight schedules', () => {
    let spy = spyOn(component['flightService'], 'getAllFlightSchedules').and.returnValue(of(lstFlightSchedules));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should throw error if service throws error', () => {
    const err = new Error();
    spyOn(component['flightService'], 'getAllFlightSchedules').and.throwError(err);
    expect(() => {
      component.ngOnInit();
    }).toThrow(err);
  });

});
