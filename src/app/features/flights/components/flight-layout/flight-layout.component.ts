import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-flight-layout',
  templateUrl: './flight-layout.component.html',
  styleUrl: './flight-layout.component.scss'
})
export class FlightLayoutComponent {

  enableFlightSchedule: boolean = true;

  constructor(private router: Router){}

  onFlightScheduleClick(): void {
    this.enableFlightSchedule = false;
    this.router.navigate(['orders']);
  }

  onFlightOrdersClick(): void {
    this.enableFlightSchedule = true;
    this.router.navigate(['schedule']);
  }

}
