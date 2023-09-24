import express from 'express';
import { ObavestenjeController } from '../controllers/obavestenje.controller';

const obavRouter = express.Router()

obavRouter.route("/svaObavKorisnik").post(
    (req, res) => new ObavestenjeController().svaObavKorisnik(req, res)
)

obavRouter.route("/procitanStatus").post(
    (req, res) => new ObavestenjeController().procitanStatus(req, res)
)

obavRouter.route("/dodaj").post(
    (req, res) => new ObavestenjeController().dodaj(req, res)
)

export default obavRouter