import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PregledLekarService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  sveOdKorIme(korisnicko_ime: string) {
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/pregledLekar/sveOdKorIme`, data)
  }

  ukloniSveOdKorIme(lekar: string){
    let data = {
      lekar: lekar
    }
    return this.http.post(`${this.uri}/pregledLekar/ukloniSveOdKorIme`, data)
  }

  dodaj(lekar: string, pregled: string){
    let data = {
      lekar: lekar,
      pregled: pregled
    }
    return this.http.post(`${this.uri}/pregledLekar/dodaj`, data)
  }

  ukloni(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/pregledLekar/ukloni`, data)
  }
  
  ukloniPregled(pregled: string){
    let data = {
      pregled: pregled
    }
    return this.http.post(`${this.uri}/pregledLekar/ukloniPregled`, data)
  }


}
