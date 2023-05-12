import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import MessageModel from "./MessageModel";
import AccountModel from "./AccountModel";
import { ModelControllers } from "../../lib/squery/Initialize";
import { compare } from "bcrypt";
import CountryModel from "./CountryModel";

let ContactSchema = SQuery.Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref:CountryModel.modelName
    },
    telephone: {
        type: String,
    },
    carte: {
        type: String
    },
    agence: {
        type: Schema.Types.ObjectId,
        ref:'agence'
    },
    typeTransaction:{
        type:String
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: AccountModel.modelName
    },

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
    } else if (ctx.data.carte) {
        const account = await  ModelControllers['account'].option.model.findOne({
            carte: ctx.data.carte
        });
        if(account){
            ctx.data.account = account._id.toString();
        }
    }
})


export default ContactModel;
