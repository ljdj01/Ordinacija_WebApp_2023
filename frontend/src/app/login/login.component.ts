import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private koriService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
  }

  korisnicko_ime: string
  lozinka: string
  poruka: string

  sacuvajSesiju(k: Korisnik){
    sessionStorage.setItem('korisnicko_ime', k.korisnicko_ime)
    sessionStorage.setItem('lozinka', k.lozinka)
    sessionStorage.setItem('ime', k.ime)
    sessionStorage.setItem('prezime', k.prezime)
    sessionStorage.setItem('adresa', k.adresa)
    sessionStorage.setItem('kontakt_telefon', k.kontakt_telefon)
    sessionStorage.setItem('email', k.email)
    sessionStorage.setItem('urlSlika', k.urlSlika)

    sessionStorage.setItem('tip', k.tip)

    sessionStorage.setItem('brLicence', k.brLicence)
    sessionStorage.setItem('specijalizacija', k.specijalizacija)
    sessionStorage.setItem('ogranak', k.ogranak)
  }

  login(){
    this.koriService.login(this.korisnicko_ime, this.lozinka).subscribe((resp: Korisnik)=>{
      if(resp != null){
        if(resp.tip == "lekar"){
          //this.poruka = "lekar"
          this.sacuvajSesiju(resp)
          this.router.navigate(['lekar'])
        }else if(resp.tip == "pacijent"){
          //this.poruka = "pacijent"
          this.sacuvajSesiju(resp)
          this.router.navigate(['pacijent'])
        }else{
          this.poruka = "Unetim podacima se ne možete ulogovati odavde"
        }
      }else{
        this.poruka = "Uneti podaci su neispravni"
      }
    })
  }


}
