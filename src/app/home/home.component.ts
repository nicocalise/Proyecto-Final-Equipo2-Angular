import { Component, OnInit } from '@angular/core';
import { CharacterInterface, CharacterResponseInterface } from 'src/app/home/models/events.model'
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  characterList: CharacterInterface[] = [];

  // Llamamos a nuestro servicio o inicializamos servicio
  constructor(private apiRequestService: ApiRequestService) {}

  // Al arrancar nuestra aplicación:
  ngOnInit() {
    this.apiRequestService.getCharacters().subscribe((data: CharacterResponseInterface) => {
      this.characterList = data.results;
    })
  }
}
