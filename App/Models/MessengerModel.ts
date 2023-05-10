import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import DiscussionModel from "./DiscussionModel";

let MessengerSchema = SQuery.Schema({
  open: {
    type: Schema.Types.ObjectId,
    ref: DiscussionModel.modelName,
  },
  closed: [
    {
      type: Schema.Types.ObjectId,
      ref: DiscussionModel.modelName,
    },
  ],
});

const MessengerModel = mongoose.model("messenger", MessengerSchema);

MakeModelCtlForm({
  schema: MessengerSchema,
  model: MessengerModel,
  volatile: false,
});

export default MessengerModel;
