import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";

let AgenceSchema = SQuery.Schema({
    name: {
        type: String
    },
    icon: {
        type: String,
    },
    number:{
        type:String,
    },
    managerName:{
        type:String
    },
    charge:{
        type:Number,
    }
});

const AgenceModel = mongoose.model("agence", AgenceSchema);

const ctrlMaker = MakeModelCtlForm({
    schema: AgenceSchema,
    model: AgenceModel,
});

export default AgenceModel;

