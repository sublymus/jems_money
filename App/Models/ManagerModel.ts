import mongoose, { Schema } from "mongoose";
import { SQueryMongooseSchema } from "../../lib/squery/Initialize";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import UserModel from "./UserModel";
import ManagerPreferenceModel from "./ManagerPreference";
import DiscussionModel from "./DiscussionModel";

const managerSchema = SQuery.Schema({
  ...(UserModel.schema as any).description,
  entreprise:{
    type:Schema.Types.ObjectId,
    ref:'entreprise',
  },
  currentDiscussions:[{
    type:Schema.Types.ObjectId,
    ref:DiscussionModel.modelName,
    strictAlien:true,
    impact:false,
    access:'admin'
  }],
  lastDiscussions:[{
    type:Schema.Types.ObjectId,
    ref:DiscussionModel.modelName,
    strictAlien:true,
    impact:false,
    access:'admin'
  }],
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
