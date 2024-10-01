import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { flightscheduleorder } from '../../model/flightscheduleorder';
import { flightschedule } from '../../model/flightschedule';

@Component({
  selector: 'app-flight-orders',
  templateUrl: './flight-orders.component.html',
  styleUrl: './flight-orders.component.scss'
})
export class FlightOrdersComponent implements OnInit {
  
  dataSource = new MatTableDataSource<any>([]);
  displayColumns: string[] = [
    'order_name',
    'flight_number',
    'departure_city',
    'arrival_city',
    'day'
  ];
  private lstOrders: flightscheduleorder[] = [];
  filteredDay: number = 1;
  constructor(private flightservice: FlightService){ }

  grpFlightByDeparture(flights: flightschedule[]) {
    let result : {[key: string] : flightschedule} = {};
    flights.forEach(val => {
      result[val.arrival_city] = val;
    });
    return result;
  }

  ngOnInit(): void {
    let rqtSchedules = this.flightservice.getAllFlightSchedules();
    let rqtOrders = this.flightservice.getAllFlightOrders();

    forkJoin([rqtSchedules, rqtOrders]).subscribe({
      next: (res) => {
        let schedules = this.grpFlightByDeparture(res[0].filter(s => s.day === this.filteredDay));
        res[1].forEach((data) =>{
          this.lstOrders.push({ 
            order_name: data.order_name, 
            departure_city: schedules[data.destination]?.departure_city, 
            day: schedules[data.destination]?.day,
            arrival_city: schedules[data.destination]?.arrival_city,
            flight_number: schedules[data.destination]?.flight_number})
        });
        this.dataSource = new MatTableDataSource<flightscheduleorder>(this.lstOrders);
      },
      error: (err) => {
        throw err;
      }
    });

  }

}
