import express = require('express');
import ZakazanPregledModel from '../models/zakazan_pregled'

export class ZakazanPregledController{

    zakazi = (req: express.Request, res: express.Response) => {

        let z = new ZakazanPregledModel({
            pacijent: req.body.pacijent,
            lekar: req.body.lekar,
            datum: req.body.datum,
            vreme: req.body.vreme,
            trajanje: req.body.trajanje,
            pregled: req.body.pregled,
            ogranak: req.body.ogranak
        })
        
        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Uspešno zakazivanje"})
        })

    }

    otkazi = (req: express.Request, res: express.Response) => {
        let datum = req.body.datum
        let lekar = req.body.lekar
        let pacijent = req.body.pacijent

        ZakazanPregledModel.deleteOne({"datum": datum, "lekar": lekar, "pacijent": pacijent}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Pregled je uspešno otkazan!"})
        })
    }

    jediniLekar = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar

        ZakazanPregledModel.find({"lekar": lekar}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    jediniPacijent = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent

        ZakazanPregledModel.find({"pacijent": pacijent}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    ukloniLekar = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        ZakazanPregledModel.deleteMany({'lekar': korisnicko_ime}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zakazani pregledi su uklonjeni iz sistema."})
        })
    }

    ukloniPacijent = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        ZakazanPregledModel.deleteMany({'pacijent': korisnicko_ime}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Zakazani pregledi su uklonjeni iz sistema."})
        })
    }


}
