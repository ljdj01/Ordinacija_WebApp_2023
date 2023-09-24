import * as express from 'express';
import KorisnikModel from '../models/korisnik'

export class KorisnikController{
    login = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka

        KorisnikModel.findOne({"korisnicko_ime": korisnicko_ime, "lozinka": lozinka}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })

    }

    jedinoKorIme = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        KorisnikModel.findOne({"korisnicko_ime": korisnicko_ime}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    jediniEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email

        KorisnikModel.findOne({"email": email}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinkaNova = req.body.lozinkaNova

        KorisnikModel.updateOne({'korisnicko_ime':korisnicko_ime}, {$set: {'lozinka': lozinkaNova}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Lozinka je uspešno promenjena!"})
        })
    }

    sviTip = (req: express.Request, res: express.Response) => {
        let tip = req.body.tip

        KorisnikModel.find({"tip": tip}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    azurirajPodatke = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let email = req.body.email
        let kontakt_telefon = req.body.kontakt_telefon
        let specijalizacija = req.body.specijalizacija
        let ogranak = req.body.ogranak
        let brLicence = req.body.brLicence
        let urlSlika = req.body.urlSlika

        KorisnikModel.updateOne({'korisnicko_ime':korisnicko_ime}, {$set: {'ime': ime, 'prezime':prezime, 'adresa':adresa, 'email':email, 
        'kontakt_telefon':kontakt_telefon, 'specijalizacija':specijalizacija, 'ogranak':ogranak, 'brLicence':brLicence, 'urlSlika':urlSlika}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Podaci su uspešno ažurirani!"})
        })

    }

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new KorisnikModel({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontakt_telefon: req.body.kontakt_telefon,
            email: req.body.email,
            urlSlika: req.body.urlSlika,
            tip: req.body.tip,
            specijalizacija: req.body.specijalizacija,
            ogranak: req.body.ogranak,
            brLicence: req.body.brLicence,
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Korisnik je unet u sistem."})
        })

    }

    ukloni = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        KorisnikModel.deleteOne({'korisnicko_ime': korisnicko_ime}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Korisnik je uklonjen iz sistema."})
        })
    }


}