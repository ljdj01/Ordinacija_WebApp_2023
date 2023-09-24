import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private koriService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.proveraPravaPristupa()
    this.korisnicko_ime = sessionStorage.getItem('korisnicko_ime')
    this.lozinkaStara = sessionStorage.getItem('lozinka')
    this.tipKorisnika = sessionStorage.getItem('tip')

    this.regexLozinka = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^(A-Za-z0-9)])(?!.*([A-Za-z0-9`~!@#$%^&*()_+\-=\]\[\\\'\"\|/.,<>?])\1)^([a-zA-Z])[A-Za-z0-9`~!@#$%^&*()_+\-=\]\\\'\"\|/.,<>?]{7,13}$/
  }

  dozvoljenPristupTipu1 = 'lekar'
  dozvoljenPristupTipu2 = 'pacijent'
  dozvoljenPristupTipu3 = 'menadzer'
  proveraPravaPristupa(){
    let tip = sessionStorage.getItem('tip')
    if(tip != this.dozvoljenPristupTipu1 && tip != this.dozvoljenPristupTipu2 && tip != this.dozvoljenPristupTipu3){
      alert("Nedozvoljen pristup!\nBicete preusmereni na pocetnu stranicu!")
      sessionStorage.clear()
      this.router.navigate([''])
    }
  }

  tipKorisnika: string = null

  korisnicko_ime: string
  lozinkaStara: string

  unosStareLozinke: string
  unosNoveLozinke: string
  potvrdaNoveLozinke: string
  regexLozinka: RegExp

  porukaC: string
  porukaB: string
  porukaA: string

  promeniLozinku(){
    this.porukaA = null
    this.porukaB = null
    this.porukaC = null
    if(this.unosStareLozinke != this.lozinkaStara){
      this.porukaA = 'Unesite ispravnu lozinku!'
      return
    }
    if(!this.regexLozinka.test(this.unosNoveLozinke)){
      this.porukaB = 'Lozinka mora da sadrzi malo i veliko slovo, broj, specijalni karakter, pocinajti slovom i biti izmedju 8 i 14 karaktera uz sva susedna slova razlicita!'
      return
    }
    if(this.unosNoveLozinke != this.potvrdaNoveLozinke){
      this.porukaC = 'Nova lozinka i potvrda lozinke moraju biti iste!'
      return
    }

    this.koriService.promeniLozinku(this.korisnicko_ime, this.unosNoveLozinke).subscribe((resp)=>{
      alert(resp['message'])
      sessionStorage.clear()
      this.router.navigate([''])
    })

  }

}
