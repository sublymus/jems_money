import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";

const ManagerPreferenceSchema = SQuery.Schema({
  nigthMode:{
    type:Boolean,
  },
  currentDevise:{
    type:String,
    match:/^.+\/.+$/
  }
  
});
export const ManagerPreferenceModel = mongoose.model("managerpreference", ManagerPreferenceSchema);

const maker = MakeModelCtlForm({
  model: ManagerPreferenceModel,
  schema: ManagerPreferenceSchema,
  volatile: false,
});


export default ManagerPreferenceModel;
