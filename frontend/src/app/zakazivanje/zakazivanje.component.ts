import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { PregledLekar } from '../model/pregled_lekar';
import { Pregled } from '../model/pregled';
import { PregledLekarService } from '../services/pregled-lekar.service';
import { PregledService } from '../services/pregled.service';
import { Time } from '@angular/common';
import { ZakazanPregled } from '../model/zakazan_pregled';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { Odsustvo } from '../model/odsustvo';
import { OdsustvoService } from '../services/odsustvo.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-zakazivanje',
  templateUrl: './zakazivanje.component.html',
  styleUrls: ['./zakazivanje.component.css']
})
export class ZakazivanjeComponent implements OnInit {

  constructor(private router: Router, private koriService: KorisnikService, 
    private pPoLService:PregledLekarService, private pregService: PregledService,
    private zakPregService: ZakazanPregledService, private odsuService: OdsustvoService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.lekarKorIme = sessionStorage.getItem('lekar')
    this.pacijent = sessionStorage.getItem('korisnicko_ime')
    this.dohvLekara()
    this.dohvPpoL()
    this.dohvZakazane()
    this.dohvOdsustvaLekara()

    this.pripremi()
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

  lekarKorIme: string
  lekar: Korisnik

  dohvLekara(){
    this.lekar = new Korisnik()
    this.koriService.jedinoKorIme(this.lekarKorIme).subscribe((resp:Korisnik)=>{
      this.lekar = resp
    })
  }

  pregledi: Pregled[]

  dohvPpoL(){
    this.pregledi = new Array()
    this.pPoLService.sveOdKorIme(this.lekarKorIme).subscribe((resp:PregledLekar[])=>{
      resp.forEach((a: PregledLekar)=>{
        this.pregService.sveOdSifra(a.pregled).subscribe((respPregled:Pregled)=>{
          this.pregledi.push(respPregled)
        })
      })
      //console.log(resp)
    })
    
  }

  izabraniPregled: string
  pregled: Pregled
  datum: Date
  vreme: string
  pacijent: string

  lekarZakazaniPregledi: ZakazanPregled[]

  postavi(s: string){
    this.pregService.sveOdSifra(s).subscribe((resp: Pregled)=>{
      this.pregled = new Pregled()
      this.pregled = resp
    })
  }

  dohvZakazane(){
    this.lekarZakazaniPregledi = new Array()
    this.zakPregService.jediniLekar(this.lekarKorIme).subscribe((resp: ZakazanPregled[])=>{
      this.lekarZakazaniPregledi = resp
      this.lekarZakazaniPregledi.sort((a, b)=>{
        let aDate = new Date(a.datum)
        let bDate = new Date(b.datum)
        return aDate.getTime() > bDate.getTime() ? 1 : -1//sort rastuci
      })
    })
  }

  odsustvaLekara: Odsustvo[]
  dohvOdsustvaLekara(){
    this.odsuService.svaOdsustvaLekar(this.lekarKorIme).subscribe((resp:Odsustvo[])=>{
      this.odsustvaLekara = new Array()
      this.odsustvaLekara = resp
    })
  }

  poruka: string

  zakazi(){
    //this.donjaPoruka = false
    this.poruka = null
    //provera
    if(this.pregled == null){
      this.poruka = "Izaberite pregled koji želite!"
      return
    }
    if(this.datum == null){
      this.poruka = "Izaberite datum koji želite!"
      return
    }
    if(this.vreme == null){
      this.poruka = "Izaberite vreme koje želite!"
      return
    }
    
    //priprema
    let datumBaza = new Date(this.datum)
    let hm = this.vreme.split(':')
    let h = parseInt(hm[0])
    let m = parseInt(hm[1])
    datumBaza.setHours(h)//plus 2 jer iz nekog razlog cuva sa dva manej nego sto treba vrv vremenska zona gmt+2
    datumBaza.setMinutes(m)

    //provera buducnosti
    let danas = new Date()
    danas.setHours(danas.getHours())//vremenska
    if(datumBaza.getTime() < danas.getTime()){
      this.poruka = "Izaberite datum i vreme u budućnosti!"
      return
    }

    //provera da l je lekar na odmoru, najbolje dohv odma a ovde proci kroz listu
    let dat = new Date(this.datum)
    dat.setHours(0)
    dat.setMinutes(0)
    let datMs = dat.getTime()
    let izadji = false
    this.odsustvaLekara.forEach((o)=>{
      let datA = new Date(o.datumPocetka)
      let datB = new Date(o.datumPovratka)
      let datAms = datA.getTime()
      let datBms = datB.getTime()

      if(datMs >= datAms && datMs < datBms){
        let danA = datA.getDate()
        let mesA = datA.getMonth() + 1
        let godA = datA.getFullYear()
        let a = danA + "." + mesA + "." + godA + "."
        let danB = datB.getDate()
        let mesB = datB.getMonth() + 1
        let godB = datB.getFullYear()
        let b = danB + "." + mesB + "." + godB + "."
        this.poruka = "Izabrani lekar je na odsustvu od " + a + " Sa odsustva se vraća " + b + " Molimo izaberite drugi termin."
        izadji = true
        return
      }
    })
    if(izadji){
      return
    }

    //dal je u okviru radnog vremena
    let s = 9 * 60 //pocetak radnog vremena u minutima
    let e = 17 * 60 // kraj radnog vremena u mintima
    let tM = this.pregled.trajanje
    let pzM = h * 60 + m //pregled zakazan u nekom minutu u toku dana
    if(pzM > e || pzM < s || (pzM + tM) > e){
      this.poruka = "Radno vreme ordinacije je 09-17h.\n Pregled mora početi i završiti se tokom radnog vremena. \n Izabrani pregled traje " + tM + " minuta."
      return
    }

    //provera zauzetosti
    let len = this.lekarZakazaniPregledi.length
    let moze = false
    if(len > 0){
      let i = 0
      let j = 1
      let pokusajS = datumBaza.getTime()// S start
      let pokusajE = pokusajS + tM * 60 * 1000 // E end
      for(i; i < len; i++){
        let zi = this.lekarZakazaniPregledi[i]
        let ziDatum = new Date(zi.datum)
        let zauzetoSi = ziDatum.getTime()
        let zauzetoEi = zauzetoSi + zi.trajanje * 60 * 1000

        if(pokusajE <= zauzetoSi && i == 0){//pre prvog
          moze = true
          break
        }
        if(pokusajS >= zauzetoEi){
          if(i + 1 >= len){//nakon poslednjeg
            moze = true
            break
          }else{//izmedju
            let zj = this.lekarZakazaniPregledi[i+1]
            let zjDatum = new Date(zj.datum)
            let zauzetoSj = zjDatum.getTime()
            if(zauzetoSj >= pokusajE){
              moze = true
              break
            }
          }
        }
      }
    }
    
    if(!moze && len > 0){
      this.poruka = "Nažalost, termin koji ste izabarali je zauzet ili se preklapa sa drugim zauzetim terminom. Molimo izabrite novi!"
      return
    }

    this.zakPregService.zakazi(this.lekarKorIme, this.pacijent, datumBaza.toString(), this.vreme, 
      this.pregled.trajanje, this.pregled.sifra, this.lekar.ogranak).subscribe((resp)=>{
        this.dohvZakazane()
        alert(resp[('message')])
    })
    console.log(this.lekarZakazaniPregledi)
  }

  donjaPoruka: boolean = false
/////////////////////////////////////////////////////////////////////////////////////

  izdvojDatum(d: string){
    if(d == null){
      return "/"
    }
    let datum = new Date(d)
    return datum.getDate() + "." + (datum.getMonth() + 1).toString() + "." + datum.getFullYear().toString() + "."
  }

  izabraniPregledKal: string
  datumNedelja: string
  satnica: Array<string>
  dani: any
  intervalSatnice: number = 15
  pripremi(){
    this.satnica = new Array()
    for(let i  = 9; i < 17; i++){
      for(let j = 0; j < 60; j+=this.intervalSatnice){
        let valI = i.toString()
        let valJ = j.toString()
        if(i < 10) valI = '0' + valI
        if(j < 10) valJ = '0' + valJ
        this.satnica.push(valI + ':' + valJ)
      }
    }

    this.dani = new Array<Dan>()
    for(let i = 0; i < 7; i++){
      let d = new Dan()
      d.termini = new Array<Polje>()
      for(let i  = 9; i < 17; i++){
        for(let j = 0; j < 60; j+=this.intervalSatnice){
          let p = new Polje()
          p.zauzeto = false
          let valI = i.toString()
          let valJ = j.toString()
          if(i < 10) valI = '0' + valI
          if(j < 10) valJ = '0' + valJ
          p.vreme = valI + ':' + valJ
          d.termini.push(p)
        }
      }
      this.dani.push(d)
    }

  }

  podesiKalendar(){

    let datum = new Date(this.datumNedelja)
    let izabranDan = datum.getDay()
    //console.log(izabranDan)
    if(izabranDan == 0){
      izabranDan = 7
    }
    let datumPocetka = new Date(datum.getTime() - ((izabranDan - 1) * 24 * 60 * 60 * 1000))
    //console.log(datumPocetka)
    let dat = datumPocetka

    //dodela datuma danima u nedelji
    this.dani.forEach((d: Dan)=>{
      //brisanje zauzetih
      d.termini.forEach((t: Polje)=>{
        t.zauzeto = false
      })

      d.datum = dat.toString()
      dat = new Date(dat.getTime() + 24 * 60 * 60 * 1000)
      //console.log(d)

    })

    let datumPocetkaMillis = datumPocetka.getTime()
    let datumKrajaMillis = dat.getTime()
    this.lekarZakazaniPregledi.forEach((p)=>{
      let datumP = new Date(p.datum)
      let datumPMillis = datumP.getTime()
      if(datumPMillis < datumKrajaMillis && datumPMillis > datumPocetkaMillis){
        console.log(p)
         let dan = datumP.getDay()
         if(dan == 0) dan = 7
         dan--
         
        let pregledS = datumPMillis//start
        let pregledE = pregledS + (p.trajanje * 60 * 1000)//end
        let danas = new Date(this.dani[dan].datum)
        ///console.log(danas)

         this.dani[dan].termini.forEach((t:Polje)=>{
          let h = parseInt(t.vreme.substring(0, 2))
          let m = parseInt(t.vreme.substring(3))
          danas.setHours(h)
          danas.setMinutes(m)
          let terminS = danas.getTime()
          let terminE = terminS + this.intervalSatnice * 60 * 1000
          if(terminS <= pregledS && terminE > pregledS || terminS > pregledS && terminE < pregledE || terminS < pregledE && terminE >= pregledE){
            t.zauzeto = true
          }
         })
      }
    })

  }

  vremeKal: string
  izabranoVremeKal: string
  zakaziInit(datum: string, vreme: string){
    let d = new Date(datum)
    let m = (d.getMonth()+1).toString()
    if(parseInt(m) < 10) m = '0' + m
    let da = d.getDate().toString()
    if(parseInt(da) < 10) da = '0' + da
    this.datumNedelja = d.getFullYear() + '-' + m + '-' + da
    this.vremeKal = vreme
    this.donjaPoruka = true
    this.izabranoVremeKal = vreme
  }

  zakaziInitPonovo(){
    this.izabraniPregled = this.izabraniPregledKal
    this.vreme = this.izabranoVremeKal
    this.datum = new Date(this.datumNedelja)
    this.zakazi()
    if(this.poruka == null)location.reload()
  }

}

export class Polje{
  vreme: string 
  zauzeto: boolean = false
}

export class Dan{
  datum: string
  termini: Array<Polje>
}