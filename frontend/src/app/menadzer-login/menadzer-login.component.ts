import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-menadzer-login',
  templateUrl: './menadzer-login.component.html',
  styleUrls: ['./menadzer-login.component.css']
})
export class MenadzerLoginComponent implements OnInit {

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
  }

  login(){
    this.koriService.login(this.korisnicko_ime, this.lozinka).subscribe((resp: Korisnik)=>{
      if(resp != null){
        if(resp.tip == "menadzer"){
          this.sacuvajSesiju(resp)
          this.router.navigate(['menadzer'])
        }else{
          this.poruka = "Uneti podaci su ne odgovaraju menadžerskom nalogu"
        }
      }else{
        this.poruka = "Uneti podaci su neispravni"
      }
    })
  }

}
