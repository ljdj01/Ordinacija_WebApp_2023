import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZakazanPregled } from '../model/zakazan_pregled';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Izvestaj } from '../model/izvestaj';
import { IzvestajService } from '../services/izvestaj.service';
import { ZahtevService } from '../services/zahtev.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-pregledi',
  templateUrl: './pregledi.component.html',
  styleUrls: ['./pregledi.component.css']
})
export class PreglediComponent implements OnInit {

  constructor(private router: Router, private zakPregService: ZakazanPregledService, private koriService: KorisnikService,
    private izveService: IzvestajService, private zahtService: ZahtevService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.pacijent = sessionStorage.getItem('korisnicko_ime')
    this.dohvSvePreglede()
    this.dohvIzvestajeZaPacijenata()
    this.dohvKorisnika()
    this.dohvLogo()
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

  pacijent: string
  pregledi: ZakazanPregled[]
  lekariRecnik: {[key: string]: string} = {}

  dohvSvePreglede(){
    this.pregledi = new Array()
    this.zakPregService.jediniPacijent(this.pacijent).subscribe((resp: ZakazanPregled[])=>{
      this.pregledi = resp
      this.pregledi.sort((a, b)=>{
        let aDate = new Date(a.datum)
        let bDate = new Date(b.datum)
        return aDate.getTime() > bDate.getTime() ? 1 : -1//sort rastuci
      })

      this.pregledi.forEach((a)=>{
        this.koriService.jedinoKorIme(a.lekar).subscribe((resp:Korisnik)=>{
          this.lekariRecnik[a.lekar] = resp.ime + " " + resp.prezime
        })
      })
      
    })
  }

  izdvojDatum(d: string){
    if(d == null){
      return "/"
    }
    let datum = new Date(d)
    return datum.getDate() + "." + (datum.getMonth() + 1).toString() + "." + datum.getFullYear().toString() + "."
  }

  dohvLekara(l: string){
    return this.lekariRecnik[l]
  }

  otkazi(datum: string, lekar: string){
    this.zakPregService.otkazi(datum, lekar, this.pacijent).subscribe((resp)=>{
      alert(resp['message'])
      this.dohvSvePreglede()
    })
  }

  izvestaji: Izvestaj[]
  dohvIzvestajeZaPacijenata(){
    this.izveService.dohvIzvestajeZaPacijenata(this.pacijent).subscribe((resp:Izvestaj[])=>{
      this.izvestaji = resp
      this.izvestaji.sort((a, b)=>{
        let aDate = new Date(a.datumIzvestaja)
        let bDate = new Date(b.datumIzvestaja)
        return aDate.getTime() > bDate.getTime() ? -1 : 1//sort opadajuci
      })
    })
  }

  daLiMozeDaOtkaze(datum: string){
    let d = new Date(datum)
    let danas = new  Date()
    return d.getTime() > danas.getTime()
  }

  
  kori: Korisnik
  dohvKorisnika(){
    this.koriService.jedinoKorIme(this.pacijent).subscribe((resp: Korisnik)=>{
      this.kori = resp
    })
  }

  logo:any
  dohvLogo(){
    this.logo = new Image()
    this.logo.src = "../../assets/logo2.png"
    //this.logo = this.logo.toString()
  }

  izvezi(izvestaj: Izvestaj){
    let d = new Date(izvestaj.datumIzvestaja)
    let datum = d.getDate() + "_" + (d.getMonth() + 1)  + "_" + d.getFullYear()  + "_" + d.getHours()  + "_" + d.getMinutes()
    let nazivFajla = izvestaj.pacijent + "_DR_" + izvestaj.imeLekara + "_" + izvestaj.prezimeLekara + "_" + datum

    let naslov = "Ordinacija Doktorovic"
    let podnaslov = "Izvestaj lekarskog pregleda"

    let sadrzaj = ("\nPacijent: " + this.kori.ime + " " + this.kori.prezime + "\nLekar: Dr " + izvestaj.imeLekara + " " +
     izvestaj.prezimeLekara + "\nDatum pregleda: " + this.izdvojDatum(izvestaj.datumPregleda) + "\nVreme pregleda: " 
     + izvestaj.vreme + "\n\nRazlog dolaska: " + izvestaj.razlogDolaska + "\n\nDijagnoza: " + izvestaj.dijagnoza + 
     "\n\nPreporucena terapija: " + izvestaj.preporucenaTerapija + "\n\nDatum kontrole: " + this.izdvojDatum(izvestaj.datumKontrole))

    let doc = new jsPDF()

    let fSize = doc.getFontSize()
    //console.log(this.logo)
    
    doc.addImage(this.logo, 'PNG', 5, 2, 25, 25)
    doc.addImage(this.logo, 'PNG', 180, 2, 25, 25)

    doc.setFont("times")

    doc.setFontSize(30)
    doc.text(naslov, 100, 15, {align: 'center', charSpace: 0, renderingMode: 'fillThenStroke'})
    doc.setFontSize(20)
    doc.text(podnaslov, 100, 25, {align: 'center', charSpace: 0, renderingMode: 'fill'})

    doc.setFontSize(fSize)//16 default
    doc.text(sadrzaj, 10, 35);
    //console.log(doc.getFont())

    const pdf = new File([doc.output("blob")], nazivFajla, {
      type: "application/pdf",
    });

    this.zahtService.posaljiPDF(nazivFajla, pdf).subscribe((resp)=>{
      console.log("pdf nacinjen")
      alert("Izveštaj je sačuvan u na adresi " + "http://localhost:4000/izvestajiPDF/" + nazivFajla + ".pdf")
    })

    /*let mejl = "Poštovani,\n\n U prilogu se nalazi link sa kog možete preuzeti izveštaj sa vašeg pregleda.\n LINK: " + 
    "http://localhost:4000/izvestajiPDF/" + nazivFajla + ".pdf\n"
    + "Takođe možete mu pristupiti i pomoći QR-koda iz priloga.\n\n S poštovanjem,\nOrdinacija Dokotorović\n"*/

    let mejlHTML = '<p>Poštovani,<br><br>U prilogu se nalazi link sa kog možete preuzeti izveštaj sa vašeg pregleda.<br><a href="http://localhost:4000/izvestajiPDF/' + nazivFajla + '.pdf">LINK<\a><br>Takođe, možete mu pristupiti i pomoći QR-koda iz priloga.<br><br>S poštovanjem,<br>Ordinacija Dokotorović<br></p>'

    this.koriService.jedinoKorIme(izvestaj.pacijent).subscribe((resp:Korisnik)=>{
      this.zahtService.posaljiMail(resp.email, mejlHTML, "http://localhost:4000/izvestajiPDF/" + nazivFajla + ".pdf").subscribe((resp)=>{
        console.log("poslat mejl")
      })
    })

  }

  izveziSve(){
    this.izvestaji.forEach((i)=>{
      this.izvezi(i)
    })
  }

}
