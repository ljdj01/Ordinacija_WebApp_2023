import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Obavestenje } from '../model/obavestenje';
import { ZakazanPregled } from '../model/zakazan_pregled';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { ObavestenjeService } from '../services/obavestenje.service';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(private router: Router, private zakPregService: ZakazanPregledService, private obavService: ObavestenjeService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.pacijent = sessionStorage.getItem('korisnicko_ime')
    this.dohvSvePreglede()
    this.dohvSvaObavestenja()
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

  svaObavestenja: Obavestenje[]

  pacijent: string
  pregledi: ZakazanPregled[]

  dohvSvePreglede(){
    this.svaObavestenja = new Array()
    this.pregledi = new Array()
    this.zakPregService.jediniPacijent(this.pacijent).subscribe((resp: ZakazanPregled[])=>{
      this.pregledi = resp

      let razlika = 24 * 60 * 60 * 1000
      let danas = new Date()
      let danasMs = danas.getTime()
      this.pregledi.forEach((a)=>{
        let aDate = new Date(a.datum)
        let vrednost = aDate.getTime() - danasMs
        if(vrednost <= razlika && vrednost > 0){
          let o = new Obavestenje()
          o.salje = "podsetnik"
          o.kome = this.pacijent
          o.procitano = false
          o.pregled = a.pregled
          let d = new Date(a.datum)
          o.datum = danas.toString()
          o.poruka = "Podsetnik! Imate zakazan pregled za " + d.getDate() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString() + ". u " + a.vreme + "h. Više o tome u kartici PREGLEDI..."
          this.svaObavestenja.push(o)
        }
      })

    })
  }

  dohvSvaObavestenja(){
    this.obavService.svaObavKorisnik(this.pacijent).subscribe((resp: Obavestenje[])=>{
      resp.forEach((o)=>{
        this.svaObavestenja.push(o)
      })
      this.svaObavestenja.sort((a, b)=>{
        let aDate = new Date(a.datum)
        let bDate = new Date(b.datum)
        return aDate.getTime() > bDate.getTime() ? -1 : +1//sort opadauci
      })
    })
  }

  izdvojDatum(d: string){
    let datum = new Date(d)
    return datum.getDate() + "." + (datum.getMonth() + 1).toString() + "." + datum.getFullYear().toString() + "."
  }

  procitaj(vr: boolean, salje: string, kome: string, poruka: string, datum: string){
    if(kome == "svima"){
      alert("Poruke koje su namenjene svima ostaju označene kao nepročitane. Kada ne budu više relevantne biće uklonjene.")
      return
    }
    
    this.svaObavestenja.forEach((o)=>{
      if(o.poruka == poruka && kome == o.kome && datum == o.datum && salje == o.salje){
        o.procitano = vr
      }
    })
    
    if(salje != "podsetnik"){
      this.obavService.procitanStatus(vr, salje, kome, poruka, datum).subscribe((resp)=>{
        return
      })
    }
  }

}
