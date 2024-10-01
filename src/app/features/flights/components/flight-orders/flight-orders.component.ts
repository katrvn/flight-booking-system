import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flight-orders',
  templateUrl: './flight-orders.component.html',
  styleUrl: './flight-orders.component.scss'
})
export class FlightOrdersComponent implements OnInit {

  displayColumns: string[] = [
    'ordername',
    'flight_number',
    'departure_city',
    'arrival_city',
    'action'
  ];

  constructor(private flightservice: FlightService){

  }

  ngOnInit(): void {
    let rest = this.flightservice.getAllFlightOrders().subscribe({
      next: (response) => {
        
      }
    });
  }

}
