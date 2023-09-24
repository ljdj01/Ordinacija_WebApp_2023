import express = require('express');
import NovipregledModel from '../models/novi_pregled'

export class NovipregledController{

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new NovipregledModel({
            lekar: req.body.lekar,
            specijalizacija: req.body.specijalizacija,
            opis: req.body.opis,
            cena: req.body.cena,
            trajanje: req.body.trajanje
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zahtev je unet u sistem."})
        })

    }

    ukloni = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        NovipregledModel.deleteMany({'lekar': korisnicko_ime}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zahtevi za novim pregledima su uklonjeni iz sistema."})
        })
    }

    ukloniUnos = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar
        let specijalizacija = req.body.specijalizacija
        let opis = req.body.opis
        let cena = req.body.cena
        let trajanje = req.body.trajanje

        NovipregledModel.deleteOne({'lekar': lekar, 'specijalizacija':specijalizacija, 'opis':opis, 'cena':cena, 'trajanje':trajanje}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zahtev za novim pregledom je uklonjen iz sistema."})
        })
    }

    dohvSve = (req: express.Request, res: express.Response) => {
        NovipregledModel.find((err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

}