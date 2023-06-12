import mongoose from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";

const UserPreferenceSchema = SQuery.Schema({
  nigthMode: {
    type: Boolean,
  },
  currentDevise: {
    type: String,
  },
  Language: {
    type: String,
  },
  watcthDifference: {
    type: String,
    match: /^.+\/.+$/,
  },
});
export const UserPreferenceModel = mongoose.model(
  "userpreference",
  UserPreferenceSchema
);

const maker = MakeModelCtlForm({
  model: UserPreferenceModel,
  schema: UserPreferenceSchema,
});

export default UserPreferenceModel;
