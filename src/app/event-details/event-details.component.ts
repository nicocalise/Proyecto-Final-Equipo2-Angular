
import { ActivatedRoute } from '@angular/router';
import { EventInterface } from './../home/models/events.model';
import { Component } from '@angular/core';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

  public eventId: string ='';
  public event?: EventInterface;

  constructor(private activatedRoute: ActivatedRoute, private requestService: ApiRequestService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      debugger
      this.eventId = params.get('event._id') as string;
      this.getEventId(this.eventId);
    });
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      console.log(queryParams);
    }) 
  }

  private getEventId(id:string): void {
    this.requestService.getEventID(id).subscribe(
      (response: EventInterface) => {
        this.event = response;
      });
  }

}
