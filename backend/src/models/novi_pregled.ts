import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Novipregled = new Schema({
    lekar : {type:String},
    specijalizacija : {type:String},
    opis: {type: String},
    cena : {type:Number},
    trajanje : {type:Number}
})

export default mongoose.model("NovipregledModel", Novipregled, "zahtevi_za_novi_pregled")