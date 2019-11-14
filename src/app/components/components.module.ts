import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgCalendarModule
  ],
  exports: [
    HeaderComponent,
    CalendarComponent
  ]
})
export class ComponentsModule { }
