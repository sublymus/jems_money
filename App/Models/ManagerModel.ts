import mongoose, { Schema } from "mongoose";
import { SQueryMongooseSchema } from "../../lib/squery/Initialize";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import UserModel from "./UserModel";
import AccountModel from "./AccountModel";
import MessengerModel from "./MessengerModel";
import ManagerPreferenceModel from "./ManagerPreference";
import EntrepriseModel from "./EntrepriseModel";

const managerSchema = SQuery.Schema({
  ...(UserModel.schema as any).description,
  entreprise:{
    type:Schema.Types.ObjectId,
    ref:'entreprise',
  },
  managerPreference:{
    type:Schema.Types.ObjectId,
    ref:ManagerPreferenceModel.modelName
  }
});
export const ManagerModel = mongoose.model("manager", managerSchema);

const maker = MakeModelCtlForm({
  model: ManagerModel,
  schema: managerSchema,
  volatile: false,
});
maker.tools.assigneToNewListElement({
  parentModelPath: 'entreprise',
  parentListProperty: 'managers',
  targetExtractorPath: './',
  targetProperty: 'entreprise',
  sourceExtractorPath: './',
  sourceProperty: '_id',
});

export default ManagerModel;
