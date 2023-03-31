import { UserInterface } from './../home/models/users.model';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { EventInterface } from './../home/models/events.model';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchResults: any[] = [];
  tickets: any[] = [];
  idUser = this.cookieService.get('id');
  public event?: EventInterface;
  public user?: UserInterface;
  

  constructor(private http: HttpClient ,private cookieService: CookieService,private requestService: ApiRequestService) {}

  ngOnInit() {
    if(!this.idUser){
      console.log('El usuario no esta logueado');
    }else{
    this.http.get<any[]>(`https://proyecto-final-equipo2-node.vercel.app/tickets/`+this.idUser, {}).subscribe(data => {
      this.searchResults = data;
      console.log(this.searchResults);

      this.searchResults.forEach(element => {

        this.requestService.getEventID(element.idEvent).subscribe(
          (response: EventInterface) => {
            this.event = response;
            this.tickets.push(this.event);
          });

      });

      this.requestService.getUserID(this.idUser).subscribe(
        (response:UserInterface)=>{
          this.user = response;
        }
        );
      });
    }
  }



}
