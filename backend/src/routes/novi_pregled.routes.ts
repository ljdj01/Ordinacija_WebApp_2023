import express from 'express';
import { NovipregledController } from '../controllers/novi_pregled.controller';

const noviPregRouter = express.Router()

noviPregRouter.route("/dodaj").post(
    (req, res) => new NovipregledController().dodaj(req, res)
)

noviPregRouter.route("/ukloni").post(
    (req, res) => new NovipregledController().ukloni(req, res)
)

noviPregRouter.route("/dohvSve").get(
    (req, res) => new NovipregledController().dohvSve(req, res)
)

noviPregRouter.route("/ukloniUnos").post(
    (req, res) => new NovipregledController().ukloniUnos(req, res)
)

export default noviPregRouter