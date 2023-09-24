import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZakazanPregled = new Schema({
    pacijent: {type:String},
    lekar: {type:String},
    datum: {type:String},
    vreme: {type:String},
    trajanje: {type:String},
    pregled: {type:String},
    ogranak: {type:String}
})

export default mongoose.model("ZakazanPregledModel", ZakazanPregled, "zakazan_pregled")