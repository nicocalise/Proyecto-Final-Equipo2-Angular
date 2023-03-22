import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  example: string;

  constructor() {
    this.example = 'Pagina del usuario';
    console.log('constructor finalizado');
  }

  ngOnInit() {
    console.log(this.example);
    console.log('ngOnInit finalizado');
  }
}
