import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import MessageModel from "./MessageModel";
import AccountModel from "./AccountModel";
import { ModelControllers } from "../../lib/squery/Initialize";

let ContactSchema = SQuery.Schema({
    country: {
        type: String,
    },
    telephone: {
        type: String,
    },
    carte: {
        type: String
    },
    agence: {
        type: String
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: AccountModel.modelName
    }
});

const ContactModel = mongoose.model("contact", ContactSchema);

const ctrlMaker = MakeModelCtlForm({
    schema: ContactSchema,
    model: ContactModel,
    volatile: true,
});

ctrlMaker.pre('read', async ({ ctx }) => {
    if (ctx.data.telephone) {
        const account = await  ModelControllers['account'].option.model.findOne({
            telephone: ctx.data.telephone
        });
        if(account){
            ctx.data.account = account._id.toString();
        }
    }
})


export default ContactModel;
