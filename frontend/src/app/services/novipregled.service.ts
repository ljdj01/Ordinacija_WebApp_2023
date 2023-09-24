import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovipregledService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  dodaj(lekar: string, specijalizacija: string, opis: string, cena: number, trajanje: number) {
    let data = {
      lekar: lekar,
      specijalizacija: specijalizacija,
      opis: opis,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/novipregled/dodaj`, data)
  }

  ukloni(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/novipregled/ukloni`, data)
  }

  dohvSve(){
    return this.http.get(`${this.uri}/novipregled/dohvSve`)
  }

  ukloniUnos(lekar: string, specijalizacija: string, opis: string, cena: number, trajanje: number){
    let data = {
      lekar: lekar,
      specijalizacija: specijalizacija,
      opis: opis,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/novipregled/ukloniUnos`, data)
  }

  
}
