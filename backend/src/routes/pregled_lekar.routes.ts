import express from 'express';
import { PregledLekarController } from '../controllers/pregled_lekar.controller';

const plRouter = express.Router()

plRouter.route("/sveOdKorIme").post(
    (req, res) => new PregledLekarController().sveOdKorIme(req, res)
)

plRouter.route("/ukloniSveOdKorIme").post(
    (req, res) => new PregledLekarController().ukloniSveOdKorIme(req, res)
)

plRouter.route("/dodaj").post(
    (req, res) => new PregledLekarController().dodaj(req, res)
)

plRouter.route("/ukloni").post(
    (req, res) => new PregledLekarController().ukloni(req, res)
)

plRouter.route("/ukloniPregled").post(
    (req, res) => new PregledLekarController().ukloniPregled(req, res)
)

export default plRouter