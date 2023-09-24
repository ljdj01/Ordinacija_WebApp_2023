import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
    datumIzvestaja : {type:String},
    vreme : {type:String},
    datumPregleda: {type: String},
    pacijent : {type:String},
    lekar : {type:String},
    imeLekara : {type:String},
    prezimeLekara : {type:String},
    razlogDolaska : {type:String},
    dijagnoza: {type:String},
    preporucenaTerapija : {type:String},
    datumKontrole : {type:String}
})

export default mongoose.model("IzvestajModel", Izvestaj, "izvestaj")