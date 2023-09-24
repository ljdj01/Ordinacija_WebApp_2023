import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Izvestaj } from '../model/izvestaj';
import { IzvestajService } from '../services/izvestaj.service';
import { ZakazanPregled } from '../model/zakazan_pregled';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-karton',
  templateUrl: './karton.component.html',
  styleUrls: ['./karton.component.css']
})
export class KartonComponent implements OnInit {

  constructor(private router: Router, private izveService: IzvestajService, private zakPregService:ZakazanPregledService,
    private koriService: KorisnikService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.lekar = sessionStorage.getItem('korisnicko_ime')
    this.pacijent = sessionStorage.getItem('pacijent')
    this.pacijentKorisnik = new Korisnik()
    this.dohvPodatkePacijenta()
    this.dohvPodatkeLekara()
    this.dohvIzvestajeZaPacijenata()
    this.dohvZakazanePreglede()
  }

  dozvoljenPristupTipu = 'lekar'
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

  izdvojDatum(d: string){
    if(d == null){
      return "/"
    }
    let datum = new Date(d)
    return datum.getDate() + "." + (datum.getMonth() + 1).toString() + "." + datum.getFullYear().toString() + "."
  }

  pacijent: string
  pacijentKorisnik: Korisnik
  dohvPodatkePacijenta(){
    this.koriService.jedinoKorIme(this.pacijent).subscribe((resp:Korisnik)=>{
      this.pacijentKorisnik = resp
      return
    })
  }
  izvestaji: Izvestaj[]
  dohvIzvestajeZaPacijenata(){
    this.izveService.dohvIzvestajeZaPacijenata(this.pacijent).subscribe((resp:Izvestaj[])=>{
      this.izvestaji = resp
    })
  }

  pregledi: ZakazanPregled[]
  preglediSvi: ZakazanPregled[]
  dohvZakazanePreglede(){
    this.zakPregService.jediniPacijent(this.pacijent).subscribe((resp:ZakazanPregled[])=>{
      this.pregledi = new Array()
      this.preglediSvi = new Array()
      this.preglediSvi = resp
      let danas = new Date()
      this.preglediSvi.forEach((p)=>{
        let pDate = new Date(p.datum)
        if(danas.getTime() > (pDate.getTime() /*+ p.trajanje * 60 * 1000*/)){
          this.pregledi.push(p)
        }
        
      })

      this.pregledi.sort((a,b)=>{
        let aDate = new Date(a.datum)
        let bDate = new Date(b.datum)
        return aDate.getTime() > bDate.getTime() ? 1 : -1//sort rastuci
      })
    })
  }

  lekar: string
  lekarKorisnik: Korisnik
  dohvPodatkeLekara(){
    this.koriService.jedinoKorIme(this.lekar).subscribe((resp:Korisnik)=>{
      this.lekarKorisnik = resp
    })
  }


  izvestavanje = false
  izabraniPregled: ZakazanPregled
  datumIzvestaja: string
  vreme: string
  pacijentImePrez: string
  razlog: string
  dijagnoza: string
  terapija: string
  datumKontrole: string
  izvesti(i: ZakazanPregled){
    this.izvestavanje = true
    this.izabraniPregled = i
    let d = new Date()
    this.datumIzvestaja = d.toString()
    this.vreme = d.getHours() + ":"+ (d.getMinutes() < 10 ? '0':'') + d.getMinutes()

    this.pacijentImePrez = this.pacijentKorisnik.ime + " " + this.pacijentKorisnik.prezime
  }

  poruka: string

  odustani(){
    this.izvestavanje = false
    this.razlog = null
    this.dijagnoza = null
    this.terapija = null
    this.datumKontrole = null
    this.poruka = null
  }
  potvrdi(){
    this.poruka = null
    
    
    if(this.datumKontrole != null){
      let datumBaza = new Date(this.datumKontrole)

      //provera buducnosti
      let danas = new Date()
      if(datumBaza.getTime() < danas.getTime()){
        this.poruka = "Izaberite datum i vreme u budućnosti!"
        return
      }
    }

    this.izveService.dodaj(this.datumIzvestaja, this.vreme, this.izabraniPregled.datum, this.pacijent, this.lekar, 
      this.lekarKorisnik.ime, this.lekarKorisnik.prezime, this.razlog, this.dijagnoza, this.terapija, this.datumKontrole).subscribe((resp)=>{
        alert(resp['message'])
        this.zakPregService.otkazi(this.izabraniPregled.datum, this.izabraniPregled.lekar, this.izabraniPregled.pacijent).subscribe((resp)=>{
          //alert(resp['message'])
          console.log("zakazani pregled je obrisan")
          window.location.reload()
        })
      })

    this.izvestavanje = false
  }


}
