import mongoose, { Schema } from "mongoose";
import { SQueryMongooseSchema } from "../../lib/squery/Initialize";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import UserModel from "./UserModel";
import AccountModel from "./AccountModel";
import MessengerModel from "./MessengerModel";
import ManagerPreferenceModel from "./ManagerPreference";

const managerSchema = SQuery.Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  },
  messenger: {
    type: Schema.Types.ObjectId,
    ref: MessengerModel.modelName,
    access: "private",
  },
  preference:{
    type:Schema.Types.ObjectId,
    ref:ManagerPreferenceModel.modelName
  }
});
export const ManagerModel = mongoose.model("manager", managerSchema);

const maker = MakeModelCtlForm({
  model: ManagerModel,
  schema: managerSchema,
  volatile: true,
});


export default ManagerModel;
