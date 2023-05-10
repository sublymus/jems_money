import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";

let AgenceSchema = SQuery.Schema({
    name: {
        type: String
    },
    icon: [{
        type: String,
        required: true,
        file: {}
    }],
    typeTransaction:[{
        type:String,
        required:true,
    }],
    country:[{
        type:String,
        required:true,
    }],
});

const AgenceModel = mongoose.model("agence", AgenceSchema);

const ctrlMaker = MakeModelCtlForm({
    schema: AgenceSchema,
    model: AgenceModel,
    volatile: true,
});

export default AgenceModel;

