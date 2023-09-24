import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  dohvIzvestajeZaPacijenata(pacijent: string) {
    let data = {
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/izvestaj/dohvIzvestajeZaPacijenata`, data)
  }

  dodaj(datumIzvestaja: string, vreme: string, datumPregleda: string, pacijent: string,
    lekar: string, imeLekara: string, prezimeLekara:string, razlogDolaska: string,
    dijagnoza: string, preporucenaTerapija: string, datumKontrole: string){

      let data = {
        datumIzvestaja: datumIzvestaja,
        vreme: vreme,
        datumPregleda: datumPregleda,
        pacijent: pacijent,
        lekar: lekar,
        imeLekara: imeLekara,
        prezimeLekara: prezimeLekara,
        razlogDolaska: razlogDolaska,
        dijagnoza: dijagnoza,
        preporucenaTerapija: preporucenaTerapija,
        datumKontrole: datumKontrole
      }

      return this.http.post(`${this.uri}/izvestaj/dodaj`, data)

  }

}
