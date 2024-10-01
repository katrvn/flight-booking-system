import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightScheduleComponent } from './components/flight-schedule/flight-schedule.component';
import { FlightOrdersComponent } from './components/flight-orders/flight-orders.component';

const routes: Routes = [
  {
    path: 'schedule',
    component: FlightScheduleComponent,
  },
  {
    path: 'orders',
    component: FlightOrdersComponent,
  },
  {
    path: '',
    component: FlightScheduleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }
