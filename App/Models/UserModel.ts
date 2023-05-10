import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import MessengerModel from "./MessengerModel";
import TransactionModel from "./Transaction";

let userSchema = SQuery.Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  },
  currentTransaction: {
    type: Schema.Types.ObjectId,
    ref: TransactionModel.modelName,
  },
  transaction: [
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
});

const UserModel = mongoose.model("user", userSchema);

const maker = MakeModelCtlForm({
  model: UserModel,
  schema: userSchema,
  volatile: true,
});

export default UserModel;
