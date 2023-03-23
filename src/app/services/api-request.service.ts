import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://rickandmortyapi.com/api/'
const characterURL = baseURL + 'character'

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  getCharacters():Observable<any> {
    return this.http.get(characterURL)
  }
}
