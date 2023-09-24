import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  jedinoKorIme(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/zahtevi_za_registraciju/jedinoKorIme`, data)
  }

  jediniEmail(email: string){
    let data = {
      email: email
    }
    return this.http.post(`${this.uri}/zahtevi_za_registraciju/jediniEmail`, data)
  }

  dodajZahtevZaReg(korisnicko_ime: string, lozinka: string, ime: string, prezime: string, adresa: string, kontakt_telefon: string, email: string, urlSlika: string){
    let data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontakt_telefon: kontakt_telefon,
      email: email,
      urlSlika: urlSlika
    }
    return this.http.post(`${this.uri}/zahtevi_za_registraciju/dodajZahtevZaReg`, data)
  }

  
  posaljiSliku(korisnicko_ime: string, images: any){
    const formData = new FormData();
    formData.append('name', korisnicko_ime);
    formData.append('file', images);
    return this.http.post(`${this.uri}/file`, formData)
  }

  ukloniSliku(putanja: string){
    //const formData = new FormData();
    console.log(putanja)
    //formData.append('putanja', putanja);
    let data = {
      putanja: putanja
    }
    return this.http.post(`${this.uri}/delete`, data)
  } 

  posaljiPDF(nazivFajla: string, fajl: any){
    const formData = new FormData();
    formData.append('name', nazivFajla);
    formData.append('file', fajl);
    return this.http.post(`${this.uri}/filePDF`, formData)
  }

  posaljiMail(primalac: string, poruka: string, pdfLink: string){
    let data = {
      primalac: primalac,
      poruka: poruka,
      pdfLink: pdfLink
    }
    return this.http.post(`${this.uri}/mail`, data)
  }

  dohvSve(){
    return this.http.get(`${this.uri}/zahtevi_za_registraciju/dohvSve`)
  }

  ukloni(korisnicko_ime: string){
    let data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post(`${this.uri}/zahtevi_za_registraciju/ukloni`, data)
  }

}
