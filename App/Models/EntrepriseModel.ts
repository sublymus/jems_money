import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import ManagerModel from "./ManagerModel";
import CountryModel from "./CountryModel";
import DiscussionModel from "./DiscussionModel";
import UserModel from "./UserModel";

const EntrepriseSchema = SQuery.Schema({
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    strictAlien:true,
    impact:false,
  }],
  managers:[{
    type:Schema.Types.ObjectId,
    ref:ManagerModel.modelName
  }],
  users:[{
    type:Schema.Types.ObjectId,
    ref:UserModel.modelName
  }],
  serviceCharge:{
    type:Number,
  },
  countries:[{
    type:Schema.Types.ObjectId, 
    ref:CountryModel.modelName
  }],
  openedDiscussion:[{
    type: Schema.Types.ObjectId,
    ref: DiscussionModel.modelName,
    impact:false,
    strictAlien:true,
  }],

  
});
export const EntrepriseModel = mongoose.model("entreprise", EntrepriseSchema);

const maker = MakeModelCtlForm({
  model: EntrepriseModel,
  schema: EntrepriseSchema,
  volatile: true,
});


export default EntrepriseModel;
