import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import DiscussionModel from "./DiscussionModel";

let MessengerSchema = SQuery.Schema({
  opened: [{
    type: Schema.Types.ObjectId,
    ref: DiscussionModel.modelName,
    impact:false,
  }],
  closed: [
    {
      type: Schema.Types.ObjectId,
      ref: DiscussionModel.modelName,
      strictAlien:true,
      impact:false,
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
