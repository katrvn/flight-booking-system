import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsRoutingModule } from './flights-routing.module';
import { FlightScheduleComponent } from './components/flight-schedule/flight-schedule.component';
import { FlightOrdersComponent } from './components/flight-orders/flight-orders.component';
import { MatTableModule } from '@angular/material/table';
import { FlightLayoutComponent } from './components/flight-layout/flight-layout.component';
import { AppRoutingModule } from '../../app-routing.module';


@NgModule({
  declarations: [
    FlightScheduleComponent,
    FlightOrdersComponent,
    FlightLayoutComponent
  ],
  imports: [
    CommonModule,
    FlightsRoutingModule,
    MatTableModule,
    AppRoutingModule 
  ],
  exports: [FlightLayoutComponent]
})
export class FlightsModule { }
