import express = require('express');
import OdbijeniModel from '../models/odbijeni'

export class OdbijeniController{

    sviOdbijeni = (req: express.Request, res: express.Response) => {
        OdbijeniModel.find((err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let z = new OdbijeniModel({
            korisnicko_ime: req.body.korisnicko_ime,
            email: req.body.email
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Odbijeni email i korisničko ime su uneti u sistem."})
        })

    }


}