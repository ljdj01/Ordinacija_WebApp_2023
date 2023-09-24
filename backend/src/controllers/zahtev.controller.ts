import express = require('express');
import ZahtevModel from '../models/zahtev'

export class ZahtevController{

    jedinoKorIme = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        ZahtevModel.findOne({"korisnicko_ime": korisnicko_ime}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    jediniEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email

        ZahtevModel.findOne({"email": email}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    dodajZahtevZaReg = (req: express.Request, res: express.Response) => {

        let z = new ZahtevModel({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontakt_telefon: req.body.kontakt_telefon,
            email: req.body.email,
            urlSlika: req.body.urlSlika
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zahtev je unet u sistem."})
        })

    }

    dohvSve = (req: express.Request, res: express.Response) => {
        ZahtevModel.find((err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    ukloni = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        ZahtevModel.deleteOne({'korisnicko_ime': korisnicko_ime}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

}
