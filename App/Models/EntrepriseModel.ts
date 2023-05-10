import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import ManagerModel from "./ManagerModel";

const EntrepriseSchema = SQuery.Schema({
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  }],
  manager:[{
    type:Schema.Types.ObjectId,
    ref:ManagerModel.modelName
  }]
});
export const EntrepriseModel = mongoose.model("entreprise", EntrepriseSchema);

const maker = MakeModelCtlForm({
  model: EntrepriseModel,
  schema: EntrepriseSchema,
  volatile: true,
});


export default EntrepriseModel;
