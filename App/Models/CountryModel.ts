import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import DiscussionModel from "./DiscussionModel";

let CountrySchema = SQuery.Schema({
    icon: [{
        type: String,
    }],
    name: {
        type:String
    },
});

const CountryModel = mongoose.model("country", CountrySchema);

MakeModelCtlForm({
    schema: CountrySchema,
    model: CountryModel,
    volatile: true,
});

export default CountryModel;
