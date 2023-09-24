import express from 'express';
import { OdbijeniController } from '../controllers/odbijeni.controller';

const odbijeniRouter = express.Router()

odbijeniRouter.route("/sviOdbijeni").get(
    (req, res) => new OdbijeniController().sviOdbijeni(req, res)
)

odbijeniRouter.route("/dodaj").post(
    (req, res) => new OdbijeniController().dodaj(req, res)
)

export default odbijeniRouter