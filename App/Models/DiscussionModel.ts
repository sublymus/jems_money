import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import MessageModel from "./MessageModel";

let DiscussionSchema = SQuery.Schema({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    strictAlien: true,
    impact: false,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    strictAlien: true,
    impact: false,
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: MessageModel.modelName,
    access: 'public',
  }],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const DiscussionModel = mongoose.model("discussion", DiscussionSchema);

const maker = MakeModelCtlForm({
  schema: DiscussionSchema,
  model: DiscussionModel,
  volatile: true,
});

maker.pre("create", async ({ ctx }) => {
});
export default DiscussionModel;
