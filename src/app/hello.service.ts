import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  private apiUrl = 'http://localhost:8080/api/hello'; //url do seu endpoint

  constructor(private http: HttpClient) { } //injeta o HttpClient

  getHelloMessage(): Observable<string> {
    // Faz uma requisição GET para a API e retorna a resposta como string
    return this.http.get(this.apiUrl, { responseType: 'text'});
  }
}
