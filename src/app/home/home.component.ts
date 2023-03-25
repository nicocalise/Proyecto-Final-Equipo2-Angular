import { EventInterface } from './models/events.model';
import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  characterList: EventInterface[] = [];

  // Llamamos a nuestro servicio o inicializamos servicio
  constructor(private apiRequestService: ApiRequestService) {}

  // Al arrancar nuestra aplicación:
  ngOnInit() {
    this.apiRequestService.getEvents().subscribe((data: EventInterface[]) => {
     console.log(data);
      this.characterList = data;
    })
  }
}
