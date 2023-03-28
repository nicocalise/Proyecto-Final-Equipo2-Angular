import { EventInterface } from './models/events.model';
import { Component } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  eventList: EventInterface[] = [];

  constructor(private apiRequestService: ApiRequestService) {}

  ngOnInit() {
    this.apiRequestService.getEvents().subscribe((data: EventInterface[]) => {
     console.log(data);
      this.eventList = data;
    })
  }
}
