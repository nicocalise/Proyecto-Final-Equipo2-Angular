import { HttpClient } from '@angular/common/http';
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
  searchResults: any[] = [];
  constructor(private apiRequestService: ApiRequestService, private http: HttpClient) {}

  ngOnInit() {
    this.apiRequestService.getEvents().subscribe((data: EventInterface[]) => {
      console.log(data);
      this.eventList = data;
    })
  }

  onSearch(query: string) {
    if(query == ""){
      console.log("No hay na");
      this.searchResults = [];
    }
    else{
    this.http.get<any[]>(`http://localhost:3000/events/name/`+query).subscribe(data => {
      this.searchResults = data;
    });
    }
  }
}
