import { ApiRequestService } from 'src/app/services/api-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EventInterface } from '../home/models/events.model';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent {

  file: File | any = null;
  public eventId: string ='';
  public eventData:EventInterface = {
        _id: 0, 
        name: '', 
        description: '', 
        location: '', 
        date: '', 
        eventType: '', 
        capacity: 0, 
        duration: '',
        foto: ''};

  constructor(private http: HttpClient, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private requestService:ApiRequestService) {}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params) => {
      if(params.get('event._id')!=null){
        this.eventId = params.get('event._id') as string;
        this.getEventId(this.eventId);
      }
    });
  }

  onSubmit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.eventId = params.get('event._id') as string;
    });

    let testData:FormData = new FormData();
    testData.append('foto', this.file);
    testData.append('name', this.eventData.name);
    testData.append('description', this.eventData.description);
    testData.append('location', this.eventData.location);
    testData.append('eventType', this.eventData.eventType);
    testData.append('capacity', this.eventData.capacity.toString());
    testData.append('duration', this.eventData.duration);
    testData.append('date', this.eventData.date);

    if(this.eventId == '' || this.eventData._id == 0){
    this.http.post<any>('https://proyecto-final-equipo2-node-oahtunfjf-nicocalise.vercel.app/events/create', testData).subscribe(
        
    (response) => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/home']);
      }
    );
    } else{
      this.http.put<any>('https://proyecto-final-equipo2-node-oahtunfjf-nicocalise.vercel.app/events/'+this.eventData._id, 
      {
        name: this.eventData.name,
        description: this.eventData.description,
        location : this.eventData.location,
        date : this.eventData.date,
        eventType: this.eventData.eventType,
        capacity : this.eventData.capacity,
        duration: this.eventData.duration,
        foto: this.eventData.foto
      }).subscribe(
        
      (response) => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/home']);
        }
      );
    }
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  private getEventId(id:string): void {
    this.requestService.getEventID(id).subscribe(
      (response: EventInterface) => {
        this.eventData = response;
      });
  }
}

