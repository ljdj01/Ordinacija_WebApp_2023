import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  login(korisnicko_ime: string, lozinka: string) {
    let data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/korisnik/login`, data)
  }

  jedinoKorIme(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/korisnik/jedinoKorIme`, data)
  }

  jediniEmail(email: string){
    let data = {
      email: email
    }
    return this.http.post(`${this.uri}/korisnik/jediniEmail`, data)
  }

  promeniLozinku(korisnicko_ime: string, lozinkaNova: string){
    let data = {
      korisnicko_ime: korisnicko_ime,
      lozinkaNova: lozinkaNova
    }
    return this.http.post(`${this.uri}/korisnik/promeniLozinku`, data)
  }

  sviTip(tip: string){
    let data = {
      tip: tip
    }
    return this.http.post(`${this.uri}/korisnik/sviTip`, data)
  }

  azurirajPodatke(korisnicko_ime: string, ime: string, prezime: string, adresa: string, kontakt_telefon: string, 
    email: string, urlSlika: string, specijalizacija: string='', ogranak: string='', brLicence: string=''){
    let data = {
      korisnicko_ime: korisnicko_ime,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontakt_telefon: kontakt_telefon,
      email: email,
      specijalizacija: specijalizacija,
      ogranak: ogranak,
      brLicence: brLicence,
      urlSlika: urlSlika
    }
    return this.http.post(`${this.uri}/korisnik/azurirajPodatke`, data)
  }

  dodaj(korisnicko_ime: string, lozinka: string, ime: string, prezime: string, adresa: string, kontakt_telefon: string, 
    email: string, urlSlika: string, tip: string, specijalizacija: string='', ogranak: string='', brLicence: string=''){
    let data = {
      korisnicko_ime: korisnicko_ime,
      ime: ime,
      prezime: prezime,
      lozinka: lozinka,
      adresa: adresa,
      kontakt_telefon: kontakt_telefon,
      email: email,
      specijalizacija: specijalizacija,
      ogranak: ogranak,
      brLicence: brLicence,
      urlSlika: urlSlika,
      tip: tip
    }
    return this.http.post(`${this.uri}/korisnik/dodaj`, data)
  }

  ukloni(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/korisnik/ukloni`, data)
  }

}
