import express from 'express';
import { OdsustvoController } from '../controllers/odsustvo.controller';

const odsRouter = express.Router()

odsRouter.route("/svaOdsustvaLekar").post(
    (req, res) => new OdsustvoController().svaOdsustvaLekar(req, res)
)

odsRouter.route("/dodaj").post(
    (req, res) => new OdsustvoController().dodaj(req, res)
)

odsRouter.route("/ukloni").post(
    (req, res) => new OdsustvoController().ukloni(req, res)
)

export default odsRouter