import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Specijalizacija = new Schema({
    naziv : {type:String}
})

export default mongoose.model("SpecijalizacijaModel", Specijalizacija, "specijalizacija")