import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Odsustvo = new Schema({
    lekar: {type:String},
    datumPocetka : {type:String},
    datumPovratka : {type:String}
})

export default mongoose.model("OdsustvoModel", Odsustvo, "odsustvo")