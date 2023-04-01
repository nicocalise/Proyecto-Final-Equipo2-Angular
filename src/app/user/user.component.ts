import { UserInterface } from './../home/models/users.model';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { EventInterface } from './../home/models/events.model';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  eliminarTicket() {
    this.http.delete(`http://localhost:3000/tickets/` + this.ticketId).subscribe(
      () => {
        console.log('Ticket eliminado correctamente');
        // Realice cualquier otra acción necesaria después de eliminar el ticket
      },
      (error) => {
        console.error('Error al eliminar el ticket', error);
        // Realice cualquier acción necesaria en caso de error
      }
    );
  }
  searchResults: any[] = [];
  ticketId: any;
  //tickets: any[] = [];
  idUser = this.cookieService.get('id');
  // public event?: EventInterface;
  public user?: UserInterface;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private requestService: ApiRequestService
  ) {}

  ngOnInit() {
    if (!this.idUser) {
      console.log('El usuario no esta logueado');
    } else {
      this.http
        .get<any[]>(`http://localhost:3000/tickets/` + this.idUser, {})
        .subscribe((data) => {
          this.searchResults = data;
          console.log(this.searchResults);

          // this.searchResults.forEach((element) => {
          //   this.requestService
          //     .getEventID(element.idEvent)
          //     .subscribe((event: EventInterface) => {
          //       // this.event = response;
          //       // this.tickets.push(this.event);
          //       // console.log(this.tickets);

          //     });
          // });

          this.requestService
            .getUserID(this.idUser)
            .subscribe((response: UserInterface) => {
              this.user = response;
            });
        });
    }
  }
}
