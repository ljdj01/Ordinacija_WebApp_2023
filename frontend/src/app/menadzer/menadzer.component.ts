import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { ZahtevService } from '../services/zahtev.service';
import { Zahtev } from '../model/zahtev';
import { OdbijeniService } from '../services/odbijeni.service';
import { ZakazanPregledService } from '../services/zakazan-pregled.service';
import { OdsustvoService } from '../services/odsustvo.service';
import { PregledLekarService } from '../services/pregled-lekar.service';
import { NovipregledService } from '../services/novipregled.service';
import { ObavestenjeService } from '../services/obavestenje.service';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private koriService: KorisnikService, private zahtService: ZahtevService,
    private odbiService: OdbijeniService, private zakPregService: ZakazanPregledService, private odsuService: OdsustvoService,
    private pregLekService:PregledLekarService, private noviPregService: NovipregledService, private obavService:ObavestenjeService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.tipKorisnik = sessionStorage.getItem('tip')
    this.dohvPacijente()
    this.dohvLekare()
    this.dohvZahteve()
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

  tipKorisnik: string = null

  pacijenti: Korisnik[]
  dohvPacijente(){
    this.koriService.sviTip('pacijent').subscribe((resp:Korisnik[])=>{
      this.pacijenti = new Array()
      this.pacijenti = resp
    })
  }

  lekari: Korisnik[]
  dohvLekare(){
    this.koriService.sviTip('lekar').subscribe((resp:Korisnik[])=>{
      this.lekari = new Array()
      this.lekari = resp
    })
  }

  images
  imageData
  imageDataTmp

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        this.images = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageDataTmp = reader.result as string;
          let img = new Image()
          img.src = this.imageDataTmp
          let w = 0
          let h = 0
          let noviThis = this
          img.addEventListener('load',function(){
            w=img.width;
            h=img.height;
            let dontAllow = (h < 100 || h > 300 || w < 100 || w > 300);
            if(dontAllow){
              alert("Profilna slika mora biti u granicama od 100x100px do 300x300px!\nIzaberite novu!")
              noviThis.imageData = null
              noviThis.images = null
              noviThis.imageDataTmp = null
            }else{
              noviThis.imageData = noviThis.imageDataTmp
            }
          });
          
        };
        reader.readAsDataURL(file);
        
      }else{
        alert("Izaberite sliku JPG, JPEG ili PNG formata!")
      }
    }
  }

  izmena: boolean = false

  izabrani: Korisnik = new Korisnik()
  izmeni(n: Korisnik){
    this.izmena = true
    this.izabrani.korisnicko_ime = n.korisnicko_ime
    this.izabrani.ime = n.ime
    this.izabrani.prezime = n.prezime
    this.izabrani.adresa = n.adresa
    this.izabrani.kontakt_telefon = n.kontakt_telefon
    this.izabrani.email = n.email
    this.izabrani.urlSlika = n.urlSlika
    this.izabrani.tip = n.tip
    this.izabrani.specijalizacija = n.specijalizacija
    this.izabrani.ogranak = n.ogranak
    this.izabrani.brLicence = n.brLicence
  }


  nazad(){
    this.izmena = false
  }

  azuriraj(){

    if(this.izabrani.ime.length == 0 || this.izabrani.prezime.length == 0 || this.izabrani.adresa.length == 0 || 
      this.izabrani.kontakt_telefon.length == 0 || this.izabrani.email.length == 0){
      alert("Sva polja moraju biti popunjena.")
      return
    }

    if(this.izabrani.tip == "lekar" && (this.izabrani.specijalizacija.length == 0 ||
      this.izabrani.ogranak.length == 0 || this.izabrani.brLicence.length == 0)){
        alert("Sva polja moraju biti popunjena.")
      return
    }

    let phoneReg: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneReg.test(this.izabrani.kontakt_telefon)){
      alert("Unesite ispravan broj telefon.")
      return
    }

    let regexE: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!regexE.test(this.izabrani.email)){
      alert("Unesite ispravnu email adresu!")
    }else{
      this.koriService.jediniEmail(this.izabrani.email).subscribe((resp:Korisnik)=>{
        if(resp!=null && resp.korisnicko_ime != this.izabrani.korisnicko_ime){
          alert("Email adresa već postoji u bazi! Upišite novu adresu!")
        }else{
          if(this.images != null){
            this.zahtService.posaljiSliku(this.izabrani.korisnicko_ime, this.images).subscribe((resp)=>{
              console.log('ovdeizServisa')
              console.log(resp)
            
              let t = (resp as any).originalname.split('.')
              let tip = t[t.length-1]
              this.izabrani.urlSlika = "http://localhost:4000/images/" + this.izabrani.korisnicko_ime + "ProfileImage." + tip;
              
              console.log(this.izabrani.urlSlika)

              
              this.koriService.azurirajPodatke(this.izabrani.korisnicko_ime, this.izabrani.ime, this.izabrani.prezime, this.izabrani.adresa, 
                this.izabrani.kontakt_telefon, this.izabrani.email, this.izabrani.urlSlika, this.izabrani.specijalizacija, this.izabrani.ogranak,
                 this.izabrani.brLicence).subscribe((resp)=>{
                
                alert(resp['message'])
                window.location.reload()
              })
          
            })
          }else{
            this.koriService.azurirajPodatke(this.izabrani.korisnicko_ime, this.izabrani.ime, this.izabrani.prezime, this.izabrani.adresa, 
              this.izabrani.kontakt_telefon, this.izabrani.email, this.izabrani.urlSlika, this.izabrani.specijalizacija, this.izabrani.ogranak,
                this.izabrani.brLicence).subscribe((resp)=>{
                
              alert(resp['message'])
              window.location.reload()
            })
          }
        }
      })
    }

  }

  obrisi(n: Korisnik){
    ////uradii
    let poruka = "Lekar " + n.ime + " " + n.prezime + " (" + n.specijalizacija + ") više neće radi. Svi njegovi pregledi su otkazani do daljnjeg."
    this.koriService.ukloni(n.korisnicko_ime).subscribe((resp)=>{
      alert(resp['message'])

      if(n.tip == 'lekar'){
        this.odsuService.ukloni(n.korisnicko_ime).subscribe((resp)=>{
          alert(resp['message'])
        })
        this.pregLekService.ukloni(n.korisnicko_ime).subscribe((resp)=>{
          alert(resp['message'])
        })
        this.noviPregService.ukloni(n.korisnicko_ime).subscribe((resp)=>{
          alert(resp['message'])
        })
        this.zakPregService.ukloniLekar(n.korisnicko_ime).subscribe((resp)=>{
          alert(resp['message'])
        })
        this.obavService.dodaj(false, "sistem", "svima", poruka, (new Date()).toString()).subscribe((resp)=>{
          alert(resp['message'])
        })
      }else{
        this.zakPregService.ukloniPacijent(n.korisnicko_ime).subscribe((resp)=>{
          alert(resp['message'])
        })
      }
      this.zahtService.ukloniSliku(n.urlSlika).subscribe((resp)=>{
        alert(resp['Slika uklonjena'])
      })
      window.location.reload()
    })

  }

  zahtevi: Zahtev[]
  dohvZahteve(){
    this.zahtService.dohvSve().subscribe((resp:Zahtev[])=>{
      this.zahtevi = new Array()
      this.zahtevi = resp
    })
  }

  prihvatiZahtev(z: Zahtev){
    this.zahtService.ukloni(z.korisnicko_ime).subscribe((resp)=>{
      this.koriService.dodaj(z.korisnicko_ime, z.lozinka, z.ime, z.prezime, z.adresa, z.kontakt_telefon, 
        z.email, z.urlSlika, "pacijent").subscribe((resp)=>{
          alert(resp['message'])
          window.location.reload()
        })
    })
    
  }

  obrisiZahtev(z: Zahtev){
    this.zahtService.ukloni(z.korisnicko_ime).subscribe((resp)=>{
      this.odbiService.dodaj(z.korisnicko_ime, z.email).subscribe((resp)=>{
        this.zahtService.ukloniSliku(z.urlSlika).subscribe((resp)=>{
          alert(resp['Slika uklonjena'])
        })
        alert(resp['message'])
        this.ngOnInit()
      })
    })
  }

}
