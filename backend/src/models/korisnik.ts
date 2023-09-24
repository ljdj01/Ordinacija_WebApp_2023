import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnicko_ime : {type:String},
    lozinka : {type:String},
    ime : {type:String},
    prezime : {type:String},
    adresa : {type:String},
    kontakt_telefon : {type:String},
    email : {type:String},
    urlSlika: {type:String},
    tip : {type:String},
    brLicence : {type:String},
    specijalizacija : {type:String},
    ogranak : {type:String}
})

export default mongoose.model("KorisnikModel", Korisnik, "korisnik")