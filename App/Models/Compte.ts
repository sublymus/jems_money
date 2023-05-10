import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AgenceModel from "./AgenceModel";
import CountryModel from "./CountryModel";

let CompteSchema = SQuery.Schema({
    counrty:{
        type:Schema.Types.ObjectId,
        ref:CountryModel.modelName,
        required:true,
    },
    type:{
        type:String,
        enum:['card','phone'],
        default:'card',
        required:true,
    },
    agence:{
        type:Schema.Types.ObjectId,
        ref:AgenceModel.modelName
    }
});

const CompteModel = mongoose.model("compte", CompteSchema);

MakeModelCtlForm({
  schema: CompteSchema,
  model: CompteModel,
  volatile: true,
});
export default CompteModel;
