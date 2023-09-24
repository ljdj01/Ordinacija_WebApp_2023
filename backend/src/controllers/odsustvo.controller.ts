import express = require('express');
import OdsustvoModel from '../models/odsustvo'

export class OdsustvoController{

    svaOdsustvaLekar = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar

        OdsustvoModel.find({"lekar": lekar}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new OdsustvoModel({
            lekar: req.body.lekar,
            datumPocetka: req.body.datumPocetka,
            datumPovratka: req.body.datumPovratka
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Odsustvo je uneto u sistem."})
        })

    }

    ukloni = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        OdsustvoModel.deleteMany({'lekar': korisnicko_ime}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zahtev za odsustvom je uklonjen iz sistema."})
        })
    }


}