import express from 'express';
import { PregledController } from '../controllers/pregled.controller';

const pregRouter = express.Router()

pregRouter.route("/sveOdSifra").post(
    (req, res) => new PregledController().sveOdSifra(req, res)
)

pregRouter.route("/sveOdSpecijalizacija").post(
    (req, res) => new PregledController().sveOdSpecijalizacija(req, res)
)

pregRouter.route("/dodaj").post(
    (req, res) => new PregledController().dodaj(req, res)
)

pregRouter.route("/dohvSve").get(
    (req, res) => new PregledController().dohvSve(req, res)
)

pregRouter.route("/ukloni").post(
    (req, res) => new PregledController().ukloni(req, res)
)

export default pregRouter