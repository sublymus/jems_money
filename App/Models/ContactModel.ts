import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import MessageModel from "./MessageModel";

let ContactSchema = SQuery.Schema({
    pays:{
        type:String,
    },
    number:{
        type:String,
    },
    carte:{
        type:String
    },
    agence:{
        type:String
    }
});

const ContactModel = mongoose.model("contact", ContactSchema);

const ctrlMaker = MakeModelCtlForm({
    schema: ContactSchema,
    model: ContactModel,
    volatile: true,
});

ctrlMaker.pre('read', async (e) => {
    /*
    TODO: pre:create 
    TODO: read:create 
    TODO: delete:create 
    TODO: update:create 
    TODO: access- droit
    */
})
ctrlMaker.post('read', async (e) => {

})

export default ContactModel;
