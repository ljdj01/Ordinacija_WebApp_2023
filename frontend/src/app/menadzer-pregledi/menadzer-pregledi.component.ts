import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoviPregled } from '../model/novi_pregled';
import { NovipregledService } from '../services/novipregled.service';
import { PregledService } from '../services/pregled.service';
import { Pregled } from '../model/pregled';
import { Specijalizacija } from '../model/specijalizacija';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { PregledLekarService } from '../services/pregled-lekar.service';
import { window } from 'rxjs';
import { ObavestenjeService } from '../services/obavestenje.service';

@Component({
  selector: 'app-menadzer-pregledi',
  templateUrl: './menadzer-pregledi.component.html',
  styleUrls: ['./menadzer-pregledi.component.css']
})
export class MenadzerPreglediComponent implements OnInit {

  constructor(private router: Router, private noviPregService: NovipregledService, private pregService: PregledService, 
    private specSercive: SpecijalizacijaService, private pPoLService: PregledLekarService, private obavService: ObavestenjeService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.dohvZahtevePreglede()
    this.dohvSpec()
    this.dohvPreglede()
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

  zahtevi: NoviPregled[]
  dohvZahtevePreglede(){
    this.noviPregService.dohvSve().subscribe((resp:NoviPregled[])=>{
      this.zahtevi = new Array()
      this.zahtevi = resp
    })
  }

  izbor: NoviPregled
  prikazi: boolean = false
  prihvatiInit(p: NoviPregled){
    this.prikazi = true
    this.izbor = p;
  }

  poruka: string
  sifra: string
  prihvati(){
    this.poruka = null
    if(this.sifra == null || this.sifra.length == 0){
      this.poruka = "Unesite šifru!"
      return
    }
    this.pregService.sveOdSifra(this.sifra).subscribe((resp:Pregled)=>{
      if(resp != null){
        this.poruka = "U sistemu postoji ova šifra. Unesite šifru koja je jedinstvena."
      }else{
        this.pregService.dodaj(this.sifra, this.izbor.specijalizacija, this.izbor.opis, this.izbor.cena, this.izbor.trajanje).subscribe((resp)=>{
          alert(resp['message'])
          this.obrisi(this.izbor)
        })
      }
    })
  }

  odustani(){
    this.poruka = null
    this.prikazi = false
    this.sifra = null
    this.izbor = null
  }

  obrisi(p: NoviPregled){
    this.noviPregService.ukloniUnos(p.lekar, p.specijalizacija, p.opis, p.cena, p.trajanje).subscribe((resp)=>{
      alert(resp['message'])
      location.reload()
    })
  }

  sveSpec: Specijalizacija[]
  dohvSpec(){
    this.specSercive.dohvSve().subscribe((resp: Specijalizacija[])=>{
      this.sveSpec = new Array()
      this.sveSpec = resp
    })
  }

  porukaSpec: string
  spec: string
  dodajSpec(){
    this.porukaSpec = null
    let izadji = false

    if(this.spec == null || this.spec.length == 0){
      this.porukaSpec = "Unesite specijalizaciju!"
      return
    }

    this.sveSpec.forEach((s)=>{
      if(s.naziv == this.spec){
        izadji = true
        return
      }
    })

    if(izadji){
      this.porukaSpec = "Specijalizacija već postoji!"
      return
    }

    this.specSercive.dodaj(this.spec).subscribe((resp)=>{
      alert(resp['message'])
      let s = new Specijalizacija()
      s.naziv = this.spec
      this.sveSpec.push(s)
      this.spec = null
    })
  }

  pregledi: Pregled[]
  preglediPrikaz: Pregled[]
  prikazSpec: string
  dohvPreglede(){
    this.pregService.dohvSve().subscribe((resp: Pregled[])=>{
      this.preglediPrikaz = new Array()
      this.pregledi = new Array()
      this.pregledi = resp
    })
  }

  osvezi(){
    this.preglediPrikaz.splice(0, this.preglediPrikaz.length)
    this.pregledi.forEach((p)=>{
      if(p.specijalizacija == this.prikazSpec){
        this.preglediPrikaz.push(p)
      }
    })
  }

  prikaziPreg: boolean
  noviPregled: Pregled = new Pregled()
  brisiPregled: Pregled = new Pregled()
  novi: boolean = false
  dodajPregInit(){
    this.noviPregled.cena = null
    this.noviPregled.opis = null
    this.noviPregled.sifra = null
    this.noviPregled.specijalizacija = null
    this.noviPregled.trajanje = 30

    this.prikaziPreg = true
    this.novi = true
  }
  odustaniPreg(){
    this.prikaziPreg = false
  }

  porukaPreg: string
  dodajPreg(){
    this.poruka = null
    if(this.noviPregled.sifra == null || this.noviPregled.specijalizacija == null || this.noviPregled.cena == null || 
      this.noviPregled.trajanje == null || this.noviPregled.opis == null || this.noviPregled.sifra.length == 0 || 
      this.noviPregled.specijalizacija.length == 0 || this.noviPregled.opis.length == 0){
      this.porukaPreg = "Popunite sva polja!"
      return
    }

    let brRegEx: RegExp = /^([0-9])+$/
    if(!brRegEx.test(this.noviPregled.cena.toString()) || !brRegEx.test(this.noviPregled.trajanje.toString())){
      this.porukaPreg = "Cena i trajanje moraju biti brojevi i to veći od nule!"
      return
    }
    if(this.noviPregled.cena < 0 || this.noviPregled.trajanje < 0){
      this.porukaPreg = "Cena i trajanje moraju veći od nule!"
      return
    }

    this.pregService.sveOdSifra(this.noviPregled.sifra).subscribe((resp:Pregled)=>{
      if(resp != null && this.novi){
        this.porukaPreg = "U sistemu postoji ova šifra. Unesite šifru koja je jedinstvena."
      }else{
        this.pregService.ukloni(this.brisiPregled.sifra, this.brisiPregled.specijalizacija, this.brisiPregled.opis, 
          this.brisiPregled.cena, this.brisiPregled.trajanje).subscribe((resp)=>{
            this.pregService.dodaj(this.noviPregled.sifra, this.noviPregled.specijalizacija, this.noviPregled.opis, this.noviPregled.cena, 
              this.noviPregled.trajanje).subscribe((resp)=>{
              alert(resp['message'])
              location.reload()
            })
          })
        
      }
    })
  }

  azurPregInit(p: Pregled){
    this.noviPregled = p
    this.brisiPregled.sifra = p.sifra
    this.brisiPregled.specijalizacija = p.specijalizacija
    this.brisiPregled.opis = p.opis
    this.brisiPregled.cena = p.cena
    this.brisiPregled.trajanje = p.trajanje
    this.prikaziPreg = true

    this.novi = false
  }

  obrisiPreg(p: Pregled){
    this.pPoLService.ukloniPregled(p.sifra).subscribe((resp)=>{
      alert(resp['message'])
      this.pregService.ukloni(p.sifra, p.specijalizacija, p.opis, p.cena, p.trajanje).subscribe((resp)=>{
        alert(resp['message'])
        let t = "Pregled " + p.sifra + " (" + p.specijalizacija + ", " + p.opis + ") se više neće vršiti u ordinaciji."
        this.obavService.dodaj(false, "sistem", "svima", t, (new Date()).toString()).subscribe((resp)=>{
          alert(resp['message'])
          location.reload()
        })
      })
    })
  }

}
