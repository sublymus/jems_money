import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import ManagerModel from "./ManagerModel";
import CountryModel from "./CountryModel";

const EntrepriseSchema = SQuery.Schema({
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  }],
  manager:[{
    type:Schema.Types.ObjectId,
    ref:ManagerModel.modelName
  }],
  serviceCharge:{
    type:Number,
  },
  countries:[{
    type:Schema.Types.ObjectId, 
    ref:CountryModel.modelName
  }],
  
});
export const EntrepriseModel = mongoose.model("entreprise", EntrepriseSchema);

const maker = MakeModelCtlForm({
  model: EntrepriseModel,
  schema: EntrepriseSchema,
  volatile: true,
});


export default EntrepriseModel;
