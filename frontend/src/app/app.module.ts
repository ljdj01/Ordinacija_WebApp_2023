import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerLoginComponent } from './menadzer-login/menadzer-login.component';
import { LoginComponent } from './login/login.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { LekariComponent } from './lekari/lekari.component';
import { PreglediComponent } from './pregledi/pregledi.component';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { RaznoComponent } from './razno/razno.component';
import { KartonComponent } from './karton/karton.component';
import { PregledlekarComponent } from './pregledlekar/pregledlekar.component';
import { MenadzerPreglediComponent } from './menadzer-pregledi/menadzer-pregledi.component';
import { MenadzerObavestenjaComponent } from './menadzer-obavestenja/menadzer-obavestenja.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenadzerComponent,
    MenadzerLoginComponent,
    LoginComponent,
    LekarComponent,
    PacijentComponent,
    RegistracijaComponent,
    PromenaLozinkeComponent,
    LekariComponent,
    PreglediComponent,
    ZakazivanjeComponent,
    ObavestenjaComponent,
    RaznoComponent,
    KartonComponent,
    PregledlekarComponent,
    MenadzerPreglediComponent,
    MenadzerObavestenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
