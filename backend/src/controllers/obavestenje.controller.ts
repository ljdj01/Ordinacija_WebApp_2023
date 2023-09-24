import express = require('express');
import ObavestenjeModel from '../models/obavestenje'

export class ObavestenjeController{

    svaObavKorisnik = (req: express.Request, res: express.Response) => {
        let kome = req.body.kome

        ObavestenjeModel.find({"kome": { $in: [ kome, "svima" ]}}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    procitanStatus = (req: express.Request, res: express.Response) => {
        let kome = req.body.kome
        let datum = req.body.datum
        let poruka = req.body.poruka
        let salje = req.body.salje
        let procitano = req.body.procitano

        ObavestenjeModel.updateOne({'kome':kome, 'datum':datum, 'poruka':poruka, 'salje':salje}, {$set: {'procitano':procitano}}, (err, resp)=>{
            if(err) console.log(err)
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new ObavestenjeModel({
            kome: req.body.kome,
            datum: req.body.datum,
            poruka: req.body.poruka,
            salje: req.body.salje,
            procitano: req.body.procitano
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Obaveštenje poslato korisniku."})
        })

    }


}