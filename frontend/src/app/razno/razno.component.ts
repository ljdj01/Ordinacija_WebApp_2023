import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OdsustvoService } from '../services/odsustvo.service';
import { NovipregledService } from '../services/novipregled.service';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { ZakazanPregled } from '../model/zakazan_pregled';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-razno',
  templateUrl: './razno.component.html',
  styleUrls: ['./razno.component.css']
})
export class RaznoComponent implements OnInit {

  constructor(private router: Router, private odsuService: OdsustvoService, private noviPregService: NovipregledService, 
    private zakPregService: ZakazanPregledService, private koriService: KorisnikService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.lekar = sessionStorage.getItem('korisnicko_ime')
    this.dohvZakazanePreglede()
    this.dohvLekara()
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

  zakazani: ZakazanPregled[]

  dohvZakazanePreglede(){
    this.zakPregService.jediniLekar(this.lekar).subscribe((resp:ZakazanPregled[])=>{
      this.zakazani = new Array()
      this.zakazani = resp
    })
  }

  lekar: string
  datumPocetka: string
  datumPovratka: string
  poruka: string
  dodaj(){
    this.poruka = null
    if(this.datumPocetka == null || this.datumPovratka == null || this.datumPocetka.length == 0 || this.datumPovratka.length == 0){
      this.poruka = "Unesite oba datuma!"
      return
    }
    let datA = new Date(this.datumPocetka)
    datA.setHours(0)
    datA.setMinutes(0)
    let datB = new Date(this.datumPovratka)
    datB.setHours(0)
    datB.setMinutes(0)
    let datAms = datA.getTime()
    let datBms = datB.getTime()

    //provera buducnosti
    let danas = (new Date()).getTime()
    if(datAms < danas || datBms < danas){
      this.poruka = "Izaberite datum i vreme u budućnosti!"
      return
    }

    if(datAms > datBms || datAms == datBms){
      this.poruka = "Datum povratka mora biti nakon datuma početka!"
      return
    }

    for(let i = 0; i < this.zakazani.length; i++){
      let d = new Date(this.zakazani[i].datum)
      d.setHours(0)
      d.setMinutes(0)
      let dms = d.getTime()
      
      if(dms >= datAms && dms < datBms){
        this.poruka = "Imate zakazan pregled za " + d + ". Otkažite pregled u kartici 'Pregledi' pa pokušajte ponovo."
        return
      }

    }

    this.odsuService.dodaj(this.lekar, datA.toString(), datB.toString()).subscribe((resp)=>{
      alert(resp['message'])
    })
  }

  lekarKorisnik: Korisnik
  specijalizacija: string
  dohvLekara(){
    this.koriService.jedinoKorIme(this.lekar).subscribe((resp:Korisnik)=>{
      this.lekarKorisnik = new Korisnik()
      this.lekarKorisnik = resp
      this.specijalizacija = this.lekarKorisnik.specijalizacija
      //console.log(this.lekarKorisnik)
    })
  }

  opis: string
  cena: number
  trajanje: number
  porukaZahtev:string
  posalji(){
    this.porukaZahtev = null

    if(this.cena == null || this.opis == null || this.trajanje == null || this.opis.length == 0){
      this.porukaZahtev = "Popunite sva polja!"
      return
    }

    let brRegEx: RegExp = /^([0-9])+$/
    if(!brRegEx.test(this.cena.toString()) || !brRegEx.test(this.trajanje.toString())){
      this.porukaZahtev = "Cena i trajanje moraju biti brojevi i to veći od nule!"
      return
    }
    if(this.cena < 0 || this.trajanje < 0){
      this.porukaZahtev = "Cena i trajanje moraju veći od nule!"
      return
    }

    this.noviPregService.dodaj(this.lekar, this.specijalizacija, this.opis, this.cena, this.trajanje).subscribe((resp)=>{
      alert(resp['message'])
      this.opis = null
      this.cena = null
      this.trajanje = null
    })

  }

}
