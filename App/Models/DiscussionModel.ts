import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import MessageModel from "./MessageModel";
import { ModelControllers } from "../../lib/squery/Initialize";

let DiscussionSchema = SQuery.Schema({
  manager: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    strictAlien: true,
    impact: false,
    access:'admin',
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    strictAlien: true,
    impact: false,
    access:'admin',
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: MessageModel.modelName,
    access: 'public',
  }],
  closed: {
    type: Boolean,
    required: true,
    default: false,
    access:'admin',
  }
});

const DiscussionModel = mongoose.model("discussion", DiscussionSchema);

const maker = MakeModelCtlForm({
  schema: DiscussionSchema,
  model: DiscussionModel,
  volatile: false,
});
export default DiscussionModel;
