import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import DiscussionModel from "./DiscussionModel";

let PaysSchema = SQuery.Schema({
    icon: [{
        type: String,
        file: {}
    }],
    name: [{
        type: Schema.Types.ObjectId,
        ref: DiscussionModel.modelName,
        required: true,
    }],
    archives: [{
        type: Schema.Types.ObjectId,
        ref: DiscussionModel.modelName,
    }],
});

const PaysModel = mongoose.model("pays", PaysSchema);

MakeModelCtlForm({
    schema: PaysSchema,
    model: PaysModel,
    volatile: true,
});

export default PaysModel;
