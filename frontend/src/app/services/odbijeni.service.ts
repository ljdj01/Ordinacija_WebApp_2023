import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OdbijeniService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  dodaj(korisnicko_ime: string, email: string){
    let data = {
      korisnicko_ime: korisnicko_ime,
      email: email
    }
    return this.http.post(`${this.uri}/odbijeni/dodaj`, data)
  }

  sviOdbijeni(){
    return this.http.get(`${this.uri}/odbijeni/sviOdbijeni`)
  }

}
