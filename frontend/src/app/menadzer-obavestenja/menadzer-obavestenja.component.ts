import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObavestenjeService } from '../services/obavestenje.service';
import { Obavestenje } from '../model/obavestenje';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-menadzer-obavestenja',
  templateUrl: './menadzer-obavestenja.component.html',
  styleUrls: ['./menadzer-obavestenja.component.css']
})
export class MenadzerObavestenjaComponent implements OnInit {

  constructor(private router: Router, private obavService: ObavestenjeService, private koriService: KorisnikService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.dohvSveKor()
    this.salje = "sistem"
    this.datum = "Prilikom slanja biće dodat današnji datum."
    this.poruka = null
  }

  dozvoljenPristupTipu = 'menadzer'
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

  sviKor: Korisnik[]
  dohvSveKor(){
    this.koriService.sviTip("pacijent").subscribe((resp: Korisnik[])=>{
      this.sviKor = new Array()
      this.sviKor = resp
    })
  }

  poruka: string
  salje: string
  kome: string
  text: string
  datum: string
  posalji(){
    if(this.text == null || this.kome == null || this.text.length == 0){
      this.poruka = "Morate uneti poruku i primaoca!"
      return
    }

    this.obavService.dodaj(false, this.salje, this.kome, this.text, (new Date()).toString()).subscribe((resp)=>{
      alert(resp['message'])
      this.kome = null
      this.text = null
      this.poruka = null
    })
  }
  


}
