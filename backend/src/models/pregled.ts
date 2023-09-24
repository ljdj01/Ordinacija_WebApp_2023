import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pregled = new Schema({
    sifra : {type:String},
    specijalizacija : {type:String},
    opis: {type:String},
    cena: {type:Number},
    trajanje: {type:Number}
})

export default mongoose.model("PregledModel", Pregled, "pregled")