import express from 'express';
import { ZakazanPregledController } from '../controllers/zakazan_pregled.controller';

const zakPregRouter = express.Router()

zakPregRouter.route("/jediniLekar").post(
    (req, res) => new ZakazanPregledController().jediniLekar(req, res)
)

zakPregRouter.route("/zakazi").post(
    (req, res) => new ZakazanPregledController().zakazi(req, res)
)

zakPregRouter.route("/jediniPacijent").post(
    (req, res) => new ZakazanPregledController().jediniPacijent(req, res)
)

zakPregRouter.route("/otkazi").post(
    (req, res) => new ZakazanPregledController().otkazi(req, res)
)

zakPregRouter.route("/ukloniLekar").post(
    (req, res) => new ZakazanPregledController().ukloniLekar(req, res)
)

zakPregRouter.route("/ukloniPacijent").post(
    (req, res) => new ZakazanPregledController().ukloniPacijent(req, res)
)

export default zakPregRouter