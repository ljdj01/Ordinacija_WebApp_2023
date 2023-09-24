import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { ZahtevService } from '../services/zahtev.service';
import { PregledLekar } from '../model/pregled_lekar';
import { PregledService } from '../services/pregled.service';
import { PregledLekarService } from '../services/pregled-lekar.service';
import { Pregled } from '../model/pregled';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

  constructor(private router: Router, private koriService: KorisnikService, private zahtService: ZahtevService,
    private pregService: PregledService, private pregLekService: PregledLekarService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.korisnicko_ime = sessionStorage.getItem('korisnicko_ime')
    this.ucitaj()
    
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

  korisnicko_ime: string
  ime: string
  prezime: string
  adresa: string
  kontakt_telefon: string
  email: string
  urlSlika: string
  specijalizacija: string
  brLicence: string
  ogranak: string

  ucitaj(){
    this.korisnicko_ime = sessionStorage.getItem('korisnicko_ime')
    this.koriService.jedinoKorIme(this.korisnicko_ime).subscribe((resp:Korisnik)=>{
      this.ime = resp.ime
      this.prezime = resp.prezime
      this.adresa = resp.adresa
      this.kontakt_telefon = resp.kontakt_telefon
      this.email = resp.email
      this.urlSlika = resp.urlSlika
      this.specijalizacija = resp.specijalizacija
      this.ogranak = resp.ogranak
      this.brLicence = resp.brLicence

      this.dohvMojePregledeKojeVrsim()
      this.dohvSveMogucePreglede()
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

  azuriranjeNijeDozvoljeno = true
  emailPromenjen = false

  dozvoliAzuriranje(){
    this.azuriranjeNijeDozvoljeno = false
  }
  odustaniAzuriranje(){
    this.azuriranjeNijeDozvoljeno = true
    this.ngOnInit()
  }

  potvrdiAzuriranje(){

    if(this.ime.length == 0 || this.prezime.length == 0 || this.adresa.length == 0 || this.kontakt_telefon.length == 0 || 
      this.specijalizacija.length == 0 || this.brLicence.length == 0){
      alert("Sva polja moraju biti popunjena.")
      return
    }

    let phoneReg: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneReg.test(this.kontakt_telefon)){
      alert("Unesite ispravan broj telefon.")
      return
    }

    if(this.images != null){
      this.zahtService.posaljiSliku(this.korisnicko_ime, this.images).subscribe((resp)=>{
        console.log('ovdeizServisa')
        console.log(resp)
      
        let t = (resp as any).originalname.split('.')
        let tip = t[t.length-1]
        this.urlSlika = "http://localhost:4000/images/" + this.korisnicko_ime + "ProfileImage." + tip;
        
        console.log(this.urlSlika)

        
        this.koriService.azurirajPodatke(this.korisnicko_ime, this.ime, this.prezime, this.adresa, this.kontakt_telefon, this.email, this.urlSlika,
           this.specijalizacija, this.ogranak, this.brLicence).subscribe((resp)=>{
          
          alert(resp['message'])
          //this.ngOnInit()
          //this.router.navigate(['pacijent'])
          window.location.reload()
        })
    
      })
    }else{
      //this.urlSlika = "http://localhost:4000/images/defaultProfileImage.png"
      this.koriService.azurirajPodatke(this.korisnicko_ime, this.ime, this.prezime, this.adresa, this.kontakt_telefon, this.email, this.urlSlika,
         this.specijalizacija, this.ogranak, this.brLicence).subscribe((resp)=>{
          
        alert(resp['message'])
        //this.ngOnInit()
        //this.router.navigate(['pacijent'])
        window.location.reload()
      })
    }

  }

  vrsim: PregledLekar[]
  vrsimSifre: string[]
  dohvMojePregledeKojeVrsim(){
    this.pregLekService.sveOdKorIme(this.korisnicko_ime).subscribe((resp:PregledLekar[])=>{
      this.vrsim = new Array()
      this.vrsim = resp
      this.vrsimSifre = new Array()
      this.vrsim.forEach((v)=>{
        this.vrsimSifre.push(v.pregled)
      })
    })
  }

  pregledi: Pregled[]
  mojiPregledi: Pregled[]
  dohvSveMogucePreglede(){
    this.pregService.sveOdSpecijalizacija(this.specijalizacija).subscribe((resp:Pregled[])=>{
      this.pregledi = new Array()
      this.pregledi = resp
      this.mojiPregledi = new Array()
      this.pregledi.forEach((p)=>{
        if(this.vrsimSifre.includes(p.sifra)){
          this.mojiPregledi.push(p)
        }
      })
    })
  }

  azuriranjeNijeDozvoljenoLista = true

  dozvoliAzuriranjeLista(){
    this.azuriranjeNijeDozvoljenoLista = false
  }
  odustaniAzuriranjeLista(){
    this.azuriranjeNijeDozvoljenoLista = true
    this.ngOnInit()
  }

  izbor: string[]
  potvrdiAzuriranjeLista(){
    console.log(this.izbor)
    let ne = "Izaberite željene preglede uz Ctrl + CLICK"
    this.pregLekService.ukloniSveOdKorIme(this.korisnicko_ime).subscribe((resp)=>{
      if(this.izbor == null){
        window.location.reload()
      }
      if(this.izbor.length == 0 || this.izbor == null){
        window.location.reload()
      }
      this.izbor.forEach((i)=>{
        if(i != ne){
          let s = i.split(" ")
          this.pregLekService.dodaj(this.korisnicko_ime, s[0]).subscribe((resp)=>{
            window.location.reload()
          })
        }
        if(this.izbor.length == 1 && this.izbor[0]){
          window.location.reload()
        }
      })
    })

    /*this.pregLekService.dodaj(this.korisnicko_ime, this.izbor[0]).subscribe((resp)=>{
      alert("ok")
    })*/

  }

}
