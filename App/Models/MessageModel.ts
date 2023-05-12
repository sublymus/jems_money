import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";

let MessageSchema = SQuery.Schema({

    account: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        strictAlien:true,
        impact:false,
    },
    text: {
        type: String
    },
    files:[{
        type: String,
        required: true,
        file:{}
      }],
});

const MessageModel = mongoose.model("message", MessageSchema);

const ctrlMaker = MakeModelCtlForm({
    schema: MessageSchema,
    model: MessageModel,
    volatile: true,
});

ctrlMaker.pre('create',async ({ctx})=>{
    if(ctx.__permission == 'admin') return;
    ctx.data.account = ctx.login.id;
})

ctrlMaker.pre('list',async ({ctx})=>{
    if(ctx.data.paging?.query?.__parentModel.startsWith('discussion')) {
        delete ctx.data.remove;
    }
})
export default MessageModel;
