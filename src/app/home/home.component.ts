import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EventInterface } from './models/events.model';
import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {
  eventList: EventInterface[] = [];
  maxEvents = 100; // máximo de 100 eventos

  endOfList = false;

  searchResults: any[] = [];
  rol?:String;
  isAdmin?:boolean;

  constructor(private apiRequestService: ApiRequestService,private cookieService: CookieService, private http: HttpClient) {}

  checkIfLastItem(lastItemId: number): boolean {
    const lastItem = this.eventList[this.eventList.length - 1];
    return lastItem._id === parseInt(lastItemId.toString());
  }

  ngOnInit() {
    this.loadEvents();

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
    this.http.get<any[]>(`http://localhost:3000/events/name/`+query).subscribe(data => {
      this.searchResults = data;
    });
    }
  }
  loadEvents() {
    this.apiRequestService.getEvents().subscribe((data: EventInterface[]) => {
      console.log(data);
      this.eventList = this.eventList.concat(data);
    });
  }

  onScroll() {
    if (this.endOfList || this.eventList.length >= this.maxEvents) {
      return;
    }

    // Comprobar si se ha llegado al final de la lista
    const lastItemIndex = this.eventList.length - 1;
    const lastItemId = this.eventList[lastItemIndex]._id;
    if (this.checkIfLastItem(lastItemId)) {
      this.endOfList = true;
      return;
    }

    // Si no se ha llegado al final de la lista y no se ha alcanzado el límite máximo, cargar más elementos

  }
}

