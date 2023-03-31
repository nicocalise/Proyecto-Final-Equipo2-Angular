import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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
  rol?:String;
  isAdmin?:boolean;
  
  constructor(private apiRequestService: ApiRequestService,private cookieService: CookieService, private http: HttpClient) {}

  ngOnInit() {
    const token = this.cookieService.get('token');
    this.rol = this.cookieService.get('rol');
    if(this.rol == 'admin'){
      this.isAdmin = true;
      console.log(this.isAdmin);
    }

    this.apiRequestService.getEvents().subscribe((data: EventInterface[]) => {
      console.log(data);
      this.eventList = data;
    });
  }

  onSearch(query: string) {
    if(query == ""){
      console.log("No hay na");
      this.searchResults = [];
    }
    else{
    this.http.get<any[]>(`https://proyecto-final-equipo2-node.vercel.app/events/name/`+query).subscribe(data => {
      this.searchResults = data;
    });
    }
  }

}
