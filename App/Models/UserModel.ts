import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import MessengerModel from "./MessengerModel";
import TransactionModel from "./Transaction";
import UserPreferenceModel from "./UserPreference";

let userSchema = SQuery.Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  },
  currentTransaction: {
    type: Schema.Types.ObjectId,
    ref: TransactionModel.modelName,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: TransactionModel.modelName,
    },
  ],
  messenger: {
    type: Schema.Types.ObjectId,
    ref: MessengerModel.modelName,
    access: "private",
  },
  preference:{
    type:Schema.Types.ObjectId,
    ref:UserPreferenceModel.modelName
  }
});

const UserModel = mongoose.model("user", userSchema);

const maker = MakeModelCtlForm({
  model: UserModel,
  schema: userSchema,
  volatile: true,
});

export default UserModel;
