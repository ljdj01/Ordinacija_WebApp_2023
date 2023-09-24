import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private koriService: KorisnikService) { }

  ngOnInit(): void {
    this.sviLekari = new Array()
    this.lekariZaPrikaz = new Array()
    this.dohvSveLekare()
  }

  sviLekari: Korisnik[]
  lekariZaPrikaz: Korisnik[]

  dohvSveLekare(){
    this.koriService.sviTip("lekar").subscribe((resp: Korisnik[])=>{
      this.sviLekari = resp
      this.sviLekari.forEach((a)=>{
        this.lekariZaPrikaz.push(a)
      })
    })
  }

  sortiranje(atribut: string, kako: boolean){
    console.log(atribut)
    console.log(kako)
    this.lekariZaPrikaz.sort((a, b)=>{
      if(kako){
        switch(atribut){
          case "ime":{
            return a.ime > b.ime ? 1 : -1
            break;
          }
          case "prezime":{
            return a.prezime > b.prezime ? 1 : -1
            break;
          }
          case "specijalizacija":{
            return a.specijalizacija > b.specijalizacija ? 1 : -1
            break;
          }
          default:{
            return 1
          }
        }
        
      }else{
        switch(atribut){
          case "ime":{
            return a.ime > b.ime ? -1 : 1
            break;
          }
          case "prezime":{
            return a.prezime > b.prezime ? -1 : 1
            break;
          }
          case "specijalizacija":{
            return a.specijalizacija > b.specijalizacija ? -1 : 1
            break;
          }
          default:{
            return -1
          }
        }
      }
    })
  }

  unosIme: string
  unosPrezime: string
  unosSpecijalizacija: string
  pretraga(){
    this.unosIme = this.unosIme != null ? this.unosIme.toLowerCase() : null
    this.unosPrezime = this.unosPrezime != null ? this.unosPrezime.toLowerCase() : null
    this.unosSpecijalizacija = this.unosSpecijalizacija != null ?  this.unosSpecijalizacija.toLowerCase() : null
    this.lekariZaPrikaz.splice(0, this.lekariZaPrikaz.length)
    this.sviLekari.forEach((a)=>{
        if(a.ime.toLowerCase().includes(this.unosIme) || this.unosIme == null){
          if(a.prezime.toLowerCase().includes(this.unosPrezime) || this.unosPrezime == null){
            if(a.specijalizacija.toLowerCase().includes(this.unosSpecijalizacija) || this.unosSpecijalizacija == null){
              this.lekariZaPrikaz.push(a)
            }
          }
        }
      }
    )
  }

}
