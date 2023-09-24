import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  svaObavKorisnik(kome: string){
    let data = {
      kome: kome
    }
    return this.http.post(`${this.uri}/obavestenje/svaObavKorisnik`, data)
  }

  procitanStatus(procitano: boolean, salje: string, kome: string, poruka: string, datum: string){
    let data = {
      procitano: procitano,
      salje: salje,
      kome: kome,
      poruka: poruka,
      datum: datum
    }
    return this.http.post(`${this.uri}/obavestenje/procitanStatus`, data)
  }

  dodaj(procitano: boolean, salje: string, kome: string, poruka: string, datum: string){
    let data = {
      procitano: procitano,
      salje: salje,
      kome: kome,
      poruka: poruka,
      datum: datum
    }
    return this.http.post(`${this.uri}/obavestenje/dodaj`, data)
  }

}
