import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:3000/';
const eventURL = baseURL + 'events';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  getEvents():Observable<any> {
    return this.http.get(eventURL)
  }

  getEventID(id:string):Observable<any>{
    return this.http.get(eventURL+'/'+id);
  }

  deleteEventID(id:string):Observable<any>{
    return this.http.delete(eventURL+'/'+id);
  }
};
