import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import MessengerModel from "./MessengerModel";
import AccountModel from "./AccountModel";

let userSchema = SQuery.Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  },
  currentTransaction: {
    type: {
      id: Schema.Types.ObjectId,
      
    }
  },
  transaction: [{
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  }],
  messenger: {
    type: Schema.Types.ObjectId,
    ref: MessengerModel.modelName,
    access: 'private'
  },

});

const UserModel = mongoose.model("user", userSchema);

const maker = MakeModelCtlForm({
  model: UserModel,
  schema: userSchema,
  volatile: true,
})

export default UserModel;
