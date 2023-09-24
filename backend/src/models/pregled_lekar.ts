import mongoose from "mongoose";

const Schema = mongoose.Schema;

let PregledLekar = new Schema({
    lekar : {type:String},
    pregled : {type:String}
})

export default mongoose.model("PregledLekarModel", PregledLekar, "pregled_lekar")