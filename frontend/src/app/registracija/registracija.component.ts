import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';
import { ZahtevService } from '../services/zahtev.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Odbijeni } from '../model/odbijeni';
import { OdbijeniService } from '../services/odbijeni.service';
import { Specijalizacija } from '../model/specijalizacija';
import { SpecijalizacijaService } from '../services/specijalizacija.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private koriService: KorisnikService, private zahtService: ZahtevService, private http: HttpClient, private router: Router, 
    private odbiService: OdbijeniService, private specService:SpecijalizacijaService) { }

  ngOnInit(): void {
    this.urlImage = "http://localhost:4000/images/defaultProfileImage.png"
    this.tipKorisnika = sessionStorage.getItem('tip')
    this.dohvOdbijene()
    this.dohvSpec()
  }

  korisnicko_ime: string
  loseKorIme: string
  lozinka: string
  lozinkaPotvrda: string
  loseLoz: string
  ime: string
  prezime: string
  adresa: string
  kontakt_telefon: string
  loseTel: string
  email: string
  loseEmail: string
  urlImage: string

  tipKorisnika: string
  specijalizacija: string
  ogranak: string
  brLicence: string

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

  odbijeni: Odbijeni[]
  dohvOdbijene(){
    this.odbiService.sviOdbijeni().subscribe((resp:Odbijeni[])=>{
      this.odbijeni = new Array()
      this.odbijeni = resp
    })
  }

  sveSpec: Specijalizacija[]
  dohvSpec(){
    this.specService.dohvSve().subscribe((resp:Specijalizacija[])=>{
      this.sveSpec = new Array()
      this.sveSpec = resp
    })
  }

  registruj(){
    if((this.specijalizacija == null || this.ogranak == null || this.brLicence == null || this.specijalizacija.length == 0 
      || this.ogranak.length == 0 || this.brLicence.length == 0) && this.tipKorisnika == 'menadzer'){
      alert("Morate popuniti sva polja!")
      return
    }

    if(this.ime.length == 0 || this.prezime.length == 0 || this.adresa.length == 0 || 
      this.kontakt_telefon.length == 0 || this.email.length == 0 || this.korisnicko_ime.length == 0 || this.korisnicko_ime == null){
      alert("Sva polja moraju biti popunjena.")
      return
    }

    //provera zabranjenih
    let izadji = false
    let korIme = false
    this.odbijeni.forEach((o)=>{
      if(o.email == this.email){
        izadji = true
        return
      }
      if(o.korisnicko_ime == this.korisnicko_ime){
        izadji = true
        korIme = true
        return
      }
    })
    if(izadji){
      if(korIme){
        alert("Korisničko ime koji želite su na listi odbijenih i zabranjenih! Molimo unesite novo korisničko ime!")
      }else{
        alert("Email koji želite su na listi odbijenih i zabranjenih! Molimo unesite novi email!")
      }
      return
    }

    //provera telefona
    let phoneReg: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneReg.test(this.kontakt_telefon)){
      alert("Unesite ispravan broj telefon.")
      return
    }

    if(this.korisnicko_ime == null){
      alert("Unesite korisnicko ime!")
    }else{
      this.koriService.jedinoKorIme(this.korisnicko_ime).subscribe((resp: Korisnik)=>{
        if(resp != null){
          alert("Unesite korisnicko ime koje je jedinstveno!")
        }else{
          if(this.lozinka == null || this.lozinkaPotvrda == null){
            alert("Unesite lozinku!")
          } else if (this.lozinka != this.lozinkaPotvrda){
            alert("Lozinka i potvrda ne smeju da se razlikuju!")
          } else {
            //(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^(A-Za-z0-9)])^([a-zA-Z])[A-Za-z0-9`~!@#$%^&*()_+\-=\]\\\'\"\|/.,<>?]{7,13}$ dobar regex
            let regex: RegExp = 
              /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^(A-Za-z0-9)])(?!.*([A-Za-z0-9`~!@#$%^&*()_+\-=\]\[\\\'\"\|/.,<>?])\1)^([a-zA-Z])[A-Za-z0-9`~!@#$%^&*()_+\-=\]\\\'\"\|/.,<>?]{7,13}$/
            ;
            if(!regex.test(this.lozinka)){
              alert("Lozinka mora da sadrzi malo i veliko slovo, broj, specijalni karakter, pocinajti slovom i biti izmedju 8 i 14 karaktera uz sva susedna slova razlicita!")
            }
            else{
              let regexE: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
              if(!regexE.test(this.email)){
                alert("Unesite ispravnu email adresu!")
              }else{
                this.koriService.jediniEmail(this.email).subscribe((resp:Korisnik)=>{
                  if(resp != null){
                    alert("Unesite jedinstveni email!")
                  }else{
                    this.zahtService.jedinoKorIme(this.korisnicko_ime).subscribe((resp)=>{
                      if(resp != null){
                        alert("U bazi vec postoji zahtev sa ovim korisnickim imenom, molimo unesite novo!")
                      }else{
                        this.zahtService.jediniEmail(this.email).subscribe((resp)=>{
                          if(resp != null){
                            alert("U bazi vec postoji zahtev sa ovom email adresom, molimo unesite novu!")
                          }else{
                            if(this.images != null){
                              this.zahtService.posaljiSliku(this.korisnicko_ime, this.images).subscribe((resp)=>{
                                console.log('ovdeizServisa')
                                console.log(resp)
                              
                                let t = (resp as any).originalname.split('.')
                                let tip = t[t.length-1]
                                this.urlImage = "http://localhost:4000/images/" + this.korisnicko_ime + "ProfileImage." + tip;
                                
                                console.log(this.urlImage)

                                if(this.tipKorisnika == 'menadzer'){
                                  this.koriService.dodaj(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.adresa, 
                                    this.kontakt_telefon, this.email, this.urlImage, "lekar", this.specijalizacija, this.ogranak, this.brLicence).subscribe((resp)=>{
                                      alert(resp['message'])
                                      this.router.navigate(['menadzer'])
                                    })
                                }else{
                                  this.zahtService.dodajZahtevZaReg(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.adresa, 
                                    this.kontakt_telefon, this.email, this.urlImage).subscribe((resp)=>{
                                    alert(resp['message'])
                                    this.router.navigate([''])
                                  })
                                }
                                
                            
                              })
                            }else{
                              console.log(this.urlImage)

                              if(this.tipKorisnika == 'menadzer'){
                                this.koriService.dodaj(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.adresa, 
                                  this.kontakt_telefon, this.email, this.urlImage,"lekar", this.specijalizacija, this.ogranak, this.brLicence).subscribe((resp)=>{
                                    alert(resp['message'])
                                    this.router.navigate(['menadzer'])
                                  })
                              }else{
                                this.zahtService.dodajZahtevZaReg(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.adresa, 
                                  this.kontakt_telefon, this.email, this.urlImage).subscribe((resp)=>{
                                  alert(resp['message'])
                                  this.router.navigate([''])
                                })
                              }
                            }
                            
                          }
                        })
                      }
                    })
                    //asd@Aa1sd.com
                  }
                })
              }
            }
          }
        }
       })

    }
    
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

