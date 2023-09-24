import express = require('express');
import IzvestajModel from '../models/izvestaj'

export class IzvestajController{

    dohvIzvestajeZaPacijenata = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent

        IzvestajModel.find({"pacijent": pacijent}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new IzvestajModel({
            datumIzvestaja: req.body.datumIzvestaja,
            vreme: req.body.vreme,
            datumPregleda: req.body.datumPregleda,
            pacijent: req.body.pacijent,
            lekar: req.body.lekar,
            imeLekara: req.body.imeLekara,
            prezimeLekara: req.body.prezimeLekara,
            razlogDolaska: req.body.razlogDolaska,
            dijagnoza: req.body.dijagnoza,
            preporucenaTerapija: req.body.preporucenaTerapija,
            datumKontrole: req.body.datumKontrole
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Izveštaj poslat."})
        })

    }


}