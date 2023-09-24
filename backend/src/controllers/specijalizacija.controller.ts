import express = require('express');
import SpecijalizacijaModel from '../models/specijalizacija'

export class SpecijalizacijaController{

    dohvSve = (req: express.Request, res: express.Response) => {
        SpecijalizacijaModel.find((err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new SpecijalizacijaModel({
            naziv: req.body.naziv
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Specijalizacija uneta u sistem."})
        })

    }


}