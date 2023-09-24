import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const koriRouter = express.Router()

koriRouter.route("/login").post(
    (req, res) => new KorisnikController().login(req, res)
)

koriRouter.route("/jedinoKorIme").post(
    (req, res) => new KorisnikController().jedinoKorIme(req, res)
)

koriRouter.route("/jediniEmail").post(
    (req, res) => new KorisnikController().jediniEmail(req, res)
)

koriRouter.route("/promeniLozinku").post(
    (req, res) => new KorisnikController().promeniLozinku(req, res)
)

koriRouter.route("/sviTip").post(
    (req, res) => new KorisnikController().sviTip(req, res)
)

koriRouter.route("/azurirajPodatke").post(
    (req, res) => new KorisnikController().azurirajPodatke(req, res)
)

koriRouter.route("/dodaj").post(
    (req, res) => new KorisnikController().dodaj(req, res)
)

koriRouter.route("/ukloni").post(
    (req, res) => new KorisnikController().ukloni(req, res)
)

export default koriRouter