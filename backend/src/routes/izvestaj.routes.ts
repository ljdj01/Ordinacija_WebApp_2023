import express from 'express';
import { IzvestajController } from '../controllers/izvestaj.controller';

const izRouter = express.Router()

izRouter.route("/dohvIzvestajeZaPacijenata").post(
    (req, res) => new IzvestajController().dohvIzvestajeZaPacijenata(req, res)
)

izRouter.route("/dodaj").post(
    (req, res) => new IzvestajController().dodaj(req, res)
)

export default izRouter