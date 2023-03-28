import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent {
  eventData = { name: '', description: '', location: '', date: '', eventType: '', capacity: '', duration: '',foto:'' };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/events/create', this.eventData).subscribe(
        
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

