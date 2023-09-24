import express from 'express';
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtRouter = express.Router()

zahtRouter.route("/jedinoKorIme").post(
    (req, res) => new ZahtevController().jedinoKorIme(req, res)
)

zahtRouter.route("/jediniEmail").post(
    (req, res) => new ZahtevController().jediniEmail(req, res)
)

zahtRouter.route("/dodajZahtevZaReg").post(
    (req, res) => new ZahtevController().dodajZahtevZaReg(req, res)
)

zahtRouter.route("/dohvSve").get(
    (req, res) => new ZahtevController().dohvSve(req, res)
)

zahtRouter.route("/ukloni").post(
    (req, res) => new ZahtevController().ukloni(req, res)
)

export default zahtRouter