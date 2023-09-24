import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-lekari',
  templateUrl: './lekari.component.html',
  styleUrls: ['./lekari.component.css']
})
export class LekariComponent implements OnInit {

  constructor(private router: Router, private koriService: KorisnikService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.sviLekari = new Array()
    this.lekariZaPrikaz = new Array()
    this.dohvSveLekare()
  }

  dozvoljenPristupTipu = 'pacijent'
  proveraPravaPristupa(){
    let tip = sessionStorage.getItem('tip')
    if(tip != this.dozvoljenPristupTipu){
      alert("Nedozvoljen pristup!\nBicete preusmereni na pocetnu stranicu!")
      sessionStorage.clear()
      this.router.navigate([''])
    }
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/login'])
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
          case "ogranak":{
            return a.ogranak > b.ogranak ? 1 : -1
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
          case "ogranak":{
            return a.ogranak > b.ogranak ? -1 : 1
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
  unosOgranak: string
  pretraga(){
    this.unosIme = this.unosIme != null ? this.unosIme.toLowerCase() : null
    this.unosPrezime = this.unosPrezime != null ? this.unosPrezime.toLowerCase() : null
    this.unosSpecijalizacija = this.unosSpecijalizacija != null ?  this.unosSpecijalizacija.toLowerCase() : null
    this.unosOgranak = this.unosOgranak != null ? this.unosOgranak.toLowerCase() : null
    this.lekariZaPrikaz.splice(0, this.lekariZaPrikaz.length)
    this.sviLekari.forEach((a)=>{
        if(a.ime.toLowerCase().includes(this.unosIme) || this.unosIme == null){
          if(a.prezime.toLowerCase().includes(this.unosPrezime) || this.unosPrezime == null){
            if(a.specijalizacija.toLowerCase().includes(this.unosSpecijalizacija) || this.unosSpecijalizacija == null){
              if(a.ogranak.toLowerCase().includes(this.unosOgranak) || this.unosOgranak == null){
                this.lekariZaPrikaz.push(a)
              }
            }
          }
        }
      }
    )
  }

  zakazi(dr: string){
    sessionStorage.setItem('lekar', dr)
    this.router.navigate(['/zakazivanje'])
  }

}
