import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  public idUser: string ='';
  public isAdmin: string = this.coockieService.get('rol');

  constructor(private activatedRoute: ActivatedRoute, 
              private requestService: ApiRequestService, 
              private http: HttpClient, 
              private coockieService:CookieService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.eventId = params.get('event._id') as string;
      this.getEventId(this.eventId);
    });

    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      console.log(queryParams);
    });

    this.activatedRoute.url.subscribe((params) => {
      params.forEach(element => {
        var url = element.toString();
        if(url =='delete')
        {
          this.deleteEvent(this.eventId);
        }
      });
    });
  }

  private getEventId(id:string): void {
    this.requestService.getEventID(id).subscribe(
      (response: EventInterface) => {
        this.event = response;
      });
  }
  public deleteEvent(id:string): void {
    this.requestService.deleteEventID(id).subscribe(
      (response: EventInterface) => {
        this.event = response;
      });
  }

  public buyTickets(quantity:string):void{
    this.idUser= this.coockieService.get('id');
    this.activatedRoute.paramMap.subscribe((params) => {
      const eventId = params.get('event._id') as string;
      const cantidad_comprada = quantity;

      this.http.post<any>('http://localhost:3000/events/comprar/'+eventId,
       '', 
       { params: { cantidad_comprada : cantidad_comprada}}
       ).subscribe(
      (response) => {
        console.log(response);
        location.reload();
        //this.cookieService.set('rol', response.data.user.user);
      },
      (error) => {
        console.log(error);
      }

    );
    debugger
    this.http.post<any>('http://localhost:3000/tickets/comprar/',
    { idUser: this.idUser, idEvent: eventId}
    ).subscribe(
    
   (response) => {
     console.log(response);
     location.reload();
     //this.cookieService.set('rol', response.data.user.user);
   },
   (error) => {
     console.log(error);
   }

 );

    });    
  }
}
