import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../model/appconfig';
import { flightschedule } from '../model/flightschedule';
import { catchError, map, reduce, throwError } from 'rxjs';
import { flightorder } from '../model/flightorder';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flightSchedule!: string;
  private flightOrders!: string;

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig) {
      this.flightSchedule = this.appConfig.mockDataFileName.flightSchedule;
      this.flightOrders = this.appConfig.mockDataFileName.flightOrders;
     }

  getAllFlightSchedules(){
    const url = `${this.appConfig.mockDataFilePath}${this.appConfig.mockDataFileName.flightSchedule}`;
    return this.httpClient.get<flightschedule[]>(url).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  getAllFlightOrders(){
    const url = `${this.appConfig.mockDataFilePath}${this.appConfig.mockDataFileName.flightOrders}`;
    return this.httpClient.get<flightorder[]>(url).pipe(
      map((val) => { 
          return Object.entries(Object.values(val)).map(([key, value]) => ({
            orderId: key,
            ...value
          }));
        }),
      catchError((err) => throwError(() => err))
    );
  }
}
