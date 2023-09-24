import express = require('express');
import PregledModel from '../models/pregled'

export class PregledController{

    sveOdSifra = (req: express.Request, res: express.Response) => {
        let sifra = req.body.sifra

        PregledModel.findOne({"sifra": sifra}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    sveOdSpecijalizacija = (req: express.Request, res: express.Response) => {
        let specijalizacija = req.body.specijalizacija

        PregledModel.find({"specijalizacija": specijalizacija}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {

        let z = new PregledModel({
            sifra: req.body.sifra,
            specijalizacija: req.body.specijalizacija,
            opis: req.body.opis,
            cena: req.body.cena,
            trajanje: req.body.trajanje
        })

        z.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Uneto u sistem."})
        })

    }

    ukloni = (req: express.Request, res: express.Response) => {
        let sifra= req.body.sifra
        let specijalizacija= req.body.specijalizacija
        let opis= req.body.opis
        let cena= req.body.cena
        let trajanje= req.body.trajanje

        PregledModel.deleteOne({'sifra':sifra, 'specijalizacija':specijalizacija, 'opis':opis, 'cena':cena, 'trajanje':trajanje}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Pregled je uklonjen."})
        })

    }


    dohvSve = (req: express.Request, res: express.Response) => {
        PregledModel.find((err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }

}