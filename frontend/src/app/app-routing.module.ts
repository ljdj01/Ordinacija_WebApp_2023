import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { MenadzerLoginComponent } from './menadzer-login/menadzer-login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { LoginComponent } from './login/login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { LekariComponent } from './lekari/lekari.component';
import { PreglediComponent } from './pregledi/pregledi.component';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { PregledlekarComponent } from './pregledlekar/pregledlekar.component';
import { KartonComponent } from './karton/karton.component';
import { RaznoComponent } from './razno/razno.component';
import { MenadzerPreglediComponent } from './menadzer-pregledi/menadzer-pregledi.component';
import { MenadzerObavestenjaComponent } from './menadzer-obavestenja/menadzer-obavestenja.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"lekar", component:LekarComponent},
  {path:"pacijent", component:PacijentComponent},
  {path:"menadzer-login", component:MenadzerLoginComponent},
  {path:"registracija", component:RegistracijaComponent},
  {path:"menadzer", component:MenadzerComponent},
  {path:"login", component:LoginComponent},
  {path:"promenaLozinke", component:PromenaLozinkeComponent},
  {path:"lekari", component:LekariComponent},
  {path:"pregledi", component:PreglediComponent},
  {path:"zakazivanje", component:ZakazivanjeComponent},
  {path:"obavestenja", component:ObavestenjaComponent},
  {path:"pregledlekar", component:PregledlekarComponent},
  {path:"karton", component:KartonComponent},
  {path:"razno", component:RaznoComponent},
  {path:"menadzer-pregledi", component:MenadzerPreglediComponent},
  {path:"menadzer-obavestenja", component:MenadzerObavestenjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
