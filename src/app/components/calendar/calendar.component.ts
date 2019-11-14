import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  calendarTitle = '';

  constructor() { }

  ngOnInit() {}

  onCurrentDateChanged(event) {}

  onEventSelected(event) {}

  onViewTitleChanged(event) {
    this.calendarTitle = event;
  }

  onTimeSelected(event) {}

}
