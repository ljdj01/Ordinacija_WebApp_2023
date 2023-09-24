import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZakazanPregled } from '../model/zakazan_pregled';
import { Korisnik } from '../model/korisnik';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { KorisnikService } from '../services/korisnik.service';
import { Obavestenje } from '../model/obavestenje';
import { ObavestenjeService } from '../services/obavestenje.service';
import { Dan, Polje } from '../zakazivanje/zakazivanje.component';

@Component({
  selector: 'app-pregledlekar',
  templateUrl: './pregledlekar.component.html',
  styleUrls: ['./pregledlekar.component.css']
})
export class PregledlekarComponent implements OnInit {

  constructor(private router: Router, private zakPregService: ZakazanPregledService, private koriService:KorisnikService,
    private obavService: ObavestenjeService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.lekar = sessionStorage.getItem('korisnicko_ime')
    this.dohvZakazanePreglede()

    this.pripremi()
    let d = new Date()
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    this.datumNedelja = d.toString()
    //this.podesiKalendar()
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

  lekar:string

  pacijentiRecnik: {[key: string]: string} = {}
  zakazaniSvi: ZakazanPregled[]
  preglediTri: ZakazanPregled[]//prva tri
  dohvZakazanePreglede(){
    this.zakazaniSvi = new Array()
    this.zakPregService.jediniLekar(this.lekar).subscribe((resp: ZakazanPregled[])=>{
      this.zakazaniSvi = resp
      this.zakazaniSvi.sort((a, b)=>{
        let aDate = new Date(a.datum)
        let bDate = new Date(b.datum)
        return aDate.getTime() > bDate.getTime() ? 1 : -1//sort rastuci
      })

      this.zakazaniSvi.forEach((a)=>{
        this.koriService.jedinoKorIme(a.pacijent).subscribe((resp:Korisnik)=>{
          this.pacijentiRecnik[a.pacijent] = resp.ime + " " + resp.prezime
        })
      })
      
      this.preglediTri = new Array()
      for(let i = 0; (i < 3) && (i < this.zakazaniSvi.length); i++){
        this.preglediTri[i] = this.zakazaniSvi[i]
      }

      this.podesiKalendar()
    })
  }

  dohvPacijenta(l: string){
    return this.pacijentiRecnik[l]
  }

  izdvojDatum(d: string){
    let datum = new Date(d)
    return datum.getDate() + "." + (datum.getMonth() + 1).toString() + "." + datum.getFullYear().toString() + "."
  }

  otkazivanje = false
  datumOtkaza: string
  vremeOtkaza: string
  pacijentOtkaz: string
  pregledOtkaz: string
  obrazlozenje: string
  otkaziInit(datum: string, vreme: string, pacijent: string, pregled: string){
    this.otkazivanje = true
    this.datumOtkaza = datum
    this.vremeOtkaza = vreme
    this.pacijentOtkaz = pacijent
    this.pregledOtkaz = pregled
    this.poruka = null
  }
  odustani(){
    this.otkazivanje = false
    this.poruka = null
  }

  poruka: string
  otkazi(){
    this.poruka = null
    if(this.obrazlozenje == null || this.obrazlozenje.length == 0){
      this.poruka = "Morate uneti neko obrazloženje!"
      return
    }

    this.otkazivanje = false;
    this.zakPregService.otkazi(this.datumOtkaza, this.lekar, this.pacijentOtkaz).subscribe((resp)=>{
      alert(resp['message'])
      this.dohvZakazanePreglede()

      let o = new Obavestenje()
      o.datum = (new Date()).toString()
      o.kome = this.pacijentOtkaz
      o.poruka = "Obaveštenje o pregledu ("+ this.pregledOtkaz +") zakazanom za "+ this.izdvojDatum(this.datumOtkaza)+ " u "+ this.vremeOtkaza +".\n" + this.obrazlozenje
      o.procitano = false
      o.salje = this.lekar
      o.pregled = this.pregledOtkaz
      this.obavService.dodaj(o.procitano, o.salje, o.kome, o.poruka, o.datum).subscribe((resp)=>{
        alert(resp['message'])
      })

    })
  }

  karton(pacijent: string){
    sessionStorage.setItem('pacijent', pacijent)
    this.router.navigate(['/karton'])
  }

  daLiMozeDaOtkaze(datum: string){
    let d = new Date(datum)
    let danas = new  Date()
    return d.getTime() > danas.getTime()
  }

  prikaziSve: boolean = false
  prikazi(){
    this.prikaziSve = true
  }
  sakrij(){
    this.prikaziSve = false
  }


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
    for(let i = 0; i < 14; i++){
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
    this.zakazaniSvi.forEach((p)=>{
      let datumP = new Date(p.datum)
      let datumPMillis = datumP.getTime()
      if(datumPMillis < datumKrajaMillis && datumPMillis > datumPocetkaMillis){
        console.log(p)
        let prviSledPon = datumPocetkaMillis + 7 * 24 * 60 * 60 * 1000
        let dan = datumP.getDay()
        if(dan == 0 && datumPMillis < prviSledPon) dan = 7
        if(datumPMillis >= prviSledPon) dan += 7
        if(dan == 0 && datumPMillis >= prviSledPon) dan = 14
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


}
