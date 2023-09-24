import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    procitano: {type: Boolean},
    salje: {type:String},
    kome: {type:String},
    poruka: {type:String},
    pregled: {type:String},
    datum: {type: String}
})

export default mongoose.model("ObavestenjeModel", Obavestenje, "obavestenje")