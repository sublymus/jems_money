import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import MessengerModel from "./MessengerModel";
import TransactionModel from "./Transaction";
import UserPreferenceModel from "./UserPreference";
import DiscussionModel from "./DiscussionModel";
import ContactModel from "./ContactModel";

let userSchema = SQuery.Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  },
  contacts:[{
    type:Schema.Types.ObjectId,
    ref:ContactModel.modelName,
    access:'private',
  }],
  currentTransaction: {
    type: Schema.Types.ObjectId,
    ref: TransactionModel.modelName,
  },
  currentDiscussion: {
    type: Schema.Types.ObjectId,
    ref: DiscussionModel.modelName,
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
