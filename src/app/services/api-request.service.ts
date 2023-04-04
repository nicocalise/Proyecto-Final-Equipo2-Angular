import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://proyecto-final-equipo2-node-oahtunfjf-nicocalise.vercel.app/';
const eventURL = baseURL + 'events';
const userURL = baseURL + 'users';

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

  getUserID(id:string):Observable<any>{
    return this.http.get(userURL+'/'+id);
  }
};
