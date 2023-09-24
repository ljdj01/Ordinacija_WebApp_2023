import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecijalizacijaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  dodaj(naziv: string){
    let data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/specijalizacija/dodaj`, data)
  }

  dohvSve(){
    return this.http.get(`${this.uri}/specijalizacija/dohvSve`)
  }

}
