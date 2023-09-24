import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Odbijeni = new Schema({
    korisnicko_ime: {type:String},
    email : {type:String}
})

export default mongoose.model("OdbijeniModel", Odbijeni, "odbijeni")