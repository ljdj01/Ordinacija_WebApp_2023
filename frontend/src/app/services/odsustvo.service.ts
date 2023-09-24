import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OdsustvoService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  svaOdsustvaLekar(lekar: string){
    let data = {
      lekar: lekar
    }
    return this.http.post(`${this.uri}/odsustvo/svaOdsustvaLekar`, data)
  }

  dodaj(lekar: string, datumPocetka: string, datumPovratka: string){
    let data = {
      lekar: lekar,
      datumPocetka: datumPocetka,
      datumPovratka: datumPovratka
    }
    return this.http.post(`${this.uri}/odsustvo/dodaj`, data)
  }

  ukloni(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/odsustvo/ukloni`, data)
  }


}
