import express = require('express');
import PregledLekarModel from '../models/pregled_lekar'

export class PregledLekarController{

    sveOdKorIme = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        PregledLekarModel.find({"lekar": korisnicko_ime}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    ukloniSveOdKorIme = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar

        PregledLekarModel.deleteMany({'lekar':lekar}, (err)=>{
            if(err) console.log(err)
            else res.json({"message":"Uklonjeno iz sistema."})
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar
        let pregled = req.body.pregled

        let z = new PregledLekarModel({
            lekar: lekar,
            pregled: pregled
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Uneto u sistem."})
        })

    }

    ukloni = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        PregledLekarModel.deleteMany({'lekar': korisnicko_ime}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zapis o pregledima koje vrši lekar je uklonjen iz sistema."})
        })
    }

    ukloniPregled = (req: express.Request, res: express.Response) => {
        let pregled = req.body.pregled

        PregledLekarModel.deleteMany({'pregled': pregled}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Pregled je uklonjen iz sistema."})
        })
    }


}