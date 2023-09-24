import express, { Router } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import koriRouter from './routes/korisnik.routes';
import zahtRouter from './routes/zahtev.routes';
import { FileHandle } from 'fs/promises';
import path from 'path';
import plRouter from './routes/pregled_lekar.routes';
import pregRouter from './routes/pregled.routes';
import zakPregRouter from './routes/zakazan_pregled.routes';
import obavRouter from './routes/obavestenje.routes';
import izRouter from './routes/izvestaj.routes';
import odsRouter from './routes/odsustvo.routes';
import noviPregRouter from './routes/novi_pregled.routes';
import odbijeniRouter from './routes/odbijeni.routes';
import specRouter from './routes/specijalizacija.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/ordinacija")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = Router()

router.use('/korisnik', koriRouter)
router.use('/zahtevi_za_registraciju', zahtRouter)
router.use('/pregledLekar', plRouter)
router.use('/pregled', pregRouter)
router.use('/zakazanPregled', zakPregRouter)
router.use('/obavestenje', obavRouter)
router.use('/izvestaj', izRouter)
router.use('/odsustvo', odsRouter)
router.use('/novipregled', noviPregRouter)
router.use('/odbijeni', odbijeniRouter)
router.use('/specijalizacija', specRouter)
app.use('/', router)

app.use('/images', express.static(path.join('./src/images')));
app.use('/izvestajiPDF', express.static(path.join('./src/izvestajiPDF')));

////////////////////////////////////////////////////////////////////////////////
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './src/images')
    },
    filename: (req, file, callBack) => {
        const mimeType = file.originalname.split('.');
        const fileType = mimeType[mimeType.length - 1];
        const fileName = req.body.name + 'ProfileImage.' + fileType;
        callBack(null, fileName)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = (req as any).file;
    //console.log(file)
    //console.log(req.body.name)
    //console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      //error.httpStatusCode = 400
      return next(error)
    }
    res.send(file);
})

////////////////////////////////////////////////////////////////////////////////

const multerPDF = require('multer');
const storagePDF = multerPDF.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './src/izvestajiPDF')
    },
    filename: (req, file, callBack) => {
        const fileName = req.body.name + '.pdf';
        callBack(null, fileName)
    }
  })
  
const uploadPDF = multerPDF({ storage: storagePDF })

app.post('/filePDF', uploadPDF.single('file'), (req, res, next) => {
    const file = (req as any).file;
    //console.log(file)
    //console.log(req.body.name)
    //console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      //error.httpStatusCode = 400
      return next(error)
    }
    res.send(file);
})


////////////////////////////////////////////////////////////////////////////////

const nodeMailer = require('nodemailer')
app.post('/mail', (req, res)=>{
  saljiMail(req.body.primalac, req.body.poruka, req.body.pdfLink)
})

const qr = require('qr-image');
async function saljiMail(primalac: string, poruka: string, pdfLink: string) {

  let qr_png = qr.image(pdfLink, {type: 'png'})
  qr_png.pipe(require('fs').createWriteStream('./src/izvestajiPDF/qr.png'))

  let transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ordinacija.doktorovic@gmail.com",
      pass: "ozvxwogjiirwttfm"
    }

  })

  let mail = await transport.sendMail({
    from: 'Sistem <ordinacija.doktorovic@gmail.com>',
    to: primalac,
    subject: "Izveštaj",
    text: poruka,
    html: poruka + `<br><img src="cid:qr_png_id">`,
    attachments: [{
      filename: 'qr.png',
      path: './src/izvestajiPDF/qr.png',
      cid: 'qr_png_id'
    }]
  });
  console.log(mail.messageId); 
}

////////////////////////////////////////////////////////////////////////////////

const fs = require('fs')
app.post('/delete', (req, res)=>{
  console.log(req.body)
  let p = (req.body.putanja) as string
  //console.log(p)
  if(p == "http://localhost:4000/images/defaultProfileImage.png") return
  p = p.substring(21)
  //console.log(p)
  p = './src' + p
  //console.log(p)
  fs.unlink(p, (err) => {
    if (err) {
      console.error(err)
      return
    }
  
    //file removed
  })
})


app.get('/', (req, res) => res.send('Hello World!'));//valjda ok
app.listen(4000, () => console.log(`Express server running on port 4000`));