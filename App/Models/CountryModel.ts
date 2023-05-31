import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AgenceModel from "./AgenceModel";

let CountrySchema = SQuery.Schema({
  icon: {
    type: String,
  },
  name: {
    type: String,
  },
  allowCarte: {
    type: Boolean,
  },
  indicatif: {
    type: String,
  },
  digit: {
    type: String,
  },
  currency: { type: String },
  agencies: [
    {
      type: Schema.Types.ObjectId,
      ref: AgenceModel.modelName,
    },
  ],
});

const CountryModel = mongoose.model("country", CountrySchema);

MakeModelCtlForm({
  schema: CountrySchema,
  model: CountryModel,
  volatile: false,
});

export default CountryModel;
