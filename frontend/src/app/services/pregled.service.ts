import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  sveOdSifra(sifra: string) {
    let data = {
      sifra: sifra
    }
    return this.http.post(`${this.uri}/pregled/sveOdSifra`, data)
  }

  sveOdSpecijalizacija(specijalizacija: string){
    let data = {
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/pregled/sveOdSpecijalizacija`, data)
  }

  dodaj(sifra: string, specijalizacija: string, opis: string, cena: number, trajanje: number) {
    let data = {
      sifra: sifra,
      specijalizacija: specijalizacija,
      opis: opis,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/pregled/dodaj`, data)
  }

  ukloni(sifra: string, specijalizacija: string, opis: string, cena: number, trajanje: number){
    let data = {
      sifra: sifra,
      specijalizacija: specijalizacija,
      opis: opis,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/pregled/ukloni`, data)
  }

  dohvSve(){
    return this.http.get(`${this.uri}/pregled/dohvSve`)
  }

}
