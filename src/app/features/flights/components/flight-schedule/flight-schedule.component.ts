import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { MatTableDataSource } from '@angular/material/table';
import { flightschedule } from '../../model/flightschedule';
import { MatDialog } from '@angular/material/dialog';
import { FlightOrdersComponent } from '../flight-orders/flight-orders.component';

@Component({
  selector: 'app-flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrl: './flight-schedule.component.scss'
})
export class FlightScheduleComponent implements OnInit{

  lstDataSources: any[] = [];

  displayColumns: string[] = [
    'flight_number',
    'departure_city',
    'arrival_city',
    'action'
  ];
  constructor(private flightService: FlightService, 
    private dialog: MatDialog){}

  grpFlightByDay(flights: flightschedule[]) {
    let result : {[key: number] : flightschedule[]} = {};
    flights.forEach(val => {
      if (!result[val.day]) {
        result[val.day] = [];
      }
      result[val.day].push(val);
    });
    return result;
  }

  ngOnInit(): void {
   this.flightService.getAllFlightSchedules().subscribe({
    next: (response) => {
      let rst = this.grpFlightByDay(response);
      for(let key in rst){
        let dataSrc = new MatTableDataSource<flightschedule>(rst[key]);
        this.lstDataSources.push(dataSrc);
      }
    },
    error: (error) => {
      throw error;
    }
   });
  }

  onViewFlight(schedule: flightschedule){
    const dialogRef = this.dialog.open(FlightOrdersComponent, {
      panelClass: 'custom-modalbox',
      minWidth: '700px',
      maxHeight: '550px',
      hasBackdrop: true,
      disableClose: false,
      data: schedule
    });
   }
}
