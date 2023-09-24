import express from 'express';
import { SpecijalizacijaController } from '../controllers/specijalizacija.controller';

const specRouter = express.Router()

specRouter.route("/dohvSve").get(
    (req, res) => new SpecijalizacijaController().dohvSve(req, res)
)

specRouter.route("/dodaj").post(
    (req, res) => new SpecijalizacijaController().dodaj(req, res)
)

export default specRouter