import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Proyecto-Final-Equipo2-Angular';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  onSearch(query: string) {
    this.http.get<any[]>(`http://localhost:3000/events`).subscribe(data => {
      this.searchResults = data;
    });
    console.log(this.searchResults);
  }
}
