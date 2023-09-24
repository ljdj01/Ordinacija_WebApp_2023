import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(private router: Router, private koriService: KorisnikService, private zahtService: ZahtevService) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.ucitaj()
    this.azuriranjeNijeDozvoljeno = true
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

  korisnicko_ime: string
  ime: string
  prezime: string
  adresa: string
  kontakt_telefon: string
  email: string
  urlSlika: string

  ucitaj(){
    this.korisnicko_ime = sessionStorage.getItem('korisnicko_ime')
    /*this.ime = sessionStorage.getItem('ime')
    this.prezime = sessionStorage.getItem('prezime')
    this.adresa = sessionStorage.getItem('adresa')
    this.kontakt_telefon = sessionStorage.getItem('kontakt_telefon')
    this.email = sessionStorage.getItem('email')
    this.urlSlika = sessionStorage.getItem('urlSlika')*/
    this.koriService.jedinoKorIme(this.korisnicko_ime).subscribe((resp:Korisnik)=>{
      this.ime = resp.ime
      this.prezime = resp.prezime
      this.adresa = resp.adresa
      this.kontakt_telefon = resp.kontakt_telefon
      this.email = resp.email
      this.urlSlika = resp.urlSlika
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

    if(this.ime.length == 0 || this.prezime.length == 0 || this.adresa.length == 0 || this.kontakt_telefon.length == 0 || this.email.length == 0){
      alert("Sva polja moraju biti popunjena.")
      return
    }

    let phoneReg: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneReg.test(this.kontakt_telefon)){
      alert("Unesite ispravan broj telefon.")
      return
    }

    let regexE: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!regexE.test(this.email)){
      alert("Unesite ispravnu email adresu!")
    }else{
      this.koriService.jediniEmail(this.email).subscribe((resp:Korisnik)=>{
        if(resp!=null && resp.korisnicko_ime != this.korisnicko_ime){
          alert("Email adresa već postoji u bazi! Upišite novu adresu!")
        }else{
          if(this.images != null){
            this.zahtService.posaljiSliku(this.korisnicko_ime, this.images).subscribe((resp)=>{
              console.log('ovdeizServisa')
              console.log(resp)
            
              let t = (resp as any).originalname.split('.')
              let tip = t[t.length-1]
              this.urlSlika = "http://localhost:4000/images/" + this.korisnicko_ime + "ProfileImage." + tip;
              
              console.log(this.urlSlika)

              
              this.koriService.azurirajPodatke(this.korisnicko_ime, this.ime, this.prezime, this.adresa, this.kontakt_telefon, 
                this.email, this.urlSlika).subscribe((resp)=>{
                
                alert(resp['message'])
                //this.ngOnInit()
                //this.router.navigate(['pacijent'])
                window.location.reload()
              })
          
            })
          }else{
            //this.urlSlika = "http://localhost:4000/images/" + this.korisnicko_ime + "ProfileImage." + tip;
            this.koriService.azurirajPodatke(this.korisnicko_ime, this.ime, this.prezime, this.adresa, this.kontakt_telefon,
               this.email, this.urlSlika).subscribe((resp)=>{
                
              alert(resp['message'])
              //this.ngOnInit()
              //this.router.navigate(['pacijent'])
              window.location.reload()
            })
          }
        }
      })
    }

  }

}
