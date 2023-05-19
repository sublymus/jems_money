import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import { ModelControllers } from "../../lib/squery/Initialize";
import CountryModel from "./CountryModel";
import { ContextSchema } from "../../lib/squery/Context";

let ContactSchema = SQuery.Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref: CountryModel.modelName,
        strictAlien: true,
        impact: false,
    },
    telephone: {
        type: String,
    },
    carte: {
        type: String
    },
    agence: {
        type: Schema.Types.ObjectId,
        ref: 'agence',
        strictAlien: true,
        impact: false,
    },
    typeTransaction: {
        type: String,
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: AccountModel.modelName,
        strictAlien: true,
        impact: false,
    },
});

const ContactModel = mongoose.model("contact", ContactSchema);

const ctrlMaker = MakeModelCtlForm({
    schema: ContactSchema,
    model: ContactModel,
    volatile: false,
});

ctrlMaker.pre('create', async ({ ctx }) => {
    await setAccount(ctx);
}).pre('update', async ({ ctx }) => {
    await setAccount(ctx);
})
async function setAccount(ctx: ContextSchema) {
    let account;
    if (ctx.data.telephone) {
        account = await ModelControllers['account'].option.model.findOne({
            telephone: ctx.data.telephone
        });
        if (account) {
            ctx.data.account = account._id.toString();
        }
    } else if (ctx.data.carte) {
        account = await ModelControllers['account'].option.model.findOne({
            carte: ctx.data.carte
        });
        if (account) {
            ctx.data.account = account._id.toString();
        }
    }
    if((ctx.data.telephone || ctx.data.telephone) && !account){
        ctx.data.account = null;
    }
}

export default ContactModel;
