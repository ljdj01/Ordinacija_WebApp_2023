import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZakazanPregledService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  jediniLekar(lekar: string){
    let data = {
      lekar: lekar
    }
    return this.http.post(`${this.uri}/zakazanPregled/jediniLekar`, data)
  }

  jediniPacijent(pacijent: string){
    let data = {
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/zakazanPregled/jediniPacijent`, data)
  }

  zakazi(lekar: string, pacijent: string, datum: string, vreme: string, trajanje: number, pregled: string, ogranak: string){
    let data = {
      lekar: lekar,
      pacijent: pacijent,
      datum: datum,
      vreme: vreme,
      trajanje: trajanje,
      pregled: pregled,
      ogranak: ogranak
    }
    return this.http.post(`${this.uri}/zakazanPregled/zakazi`, data)
  }

  otkazi(datum: string, lekar: string, pacijent: string){
    let data = {
      datum: datum,
      lekar: lekar,
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/zakazanPregled/otkazi`, data)
  }

  ukloniLekar(korisnicko_ime:string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/zakazanPregled/ukloniLekar`, data)
  }

  ukloniPacijent(korisnicko_ime:string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/zakazanPregled/ukloniPacijent`, data)
  }

}
