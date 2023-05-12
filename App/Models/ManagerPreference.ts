import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";

const ManagerPreferenceSchema = SQuery.Schema({

});
export const ManagerPreferenceModel = mongoose.model("managerpreference", ManagerPreferenceSchema);

const maker = MakeModelCtlForm({
  model: ManagerPreferenceModel,
  schema: ManagerPreferenceSchema,
  volatile: false,
});


export default ManagerPreferenceModel;
