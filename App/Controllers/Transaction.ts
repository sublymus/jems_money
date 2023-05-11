import { ContextSchema } from "../../lib/squery/Context";
import { CtrlManager } from "../../lib/squery/CtrlManager";
import { ControllerSchema, ModelControllers, ResponseSchema } from "../../lib/squery/Initialize";

const Transaction: ControllerSchema = {
    start: async (ctx: ContextSchema): ResponseSchema => {
       const user = await ModelControllers['user'].option.model.findOne({
        _id: ctx.signup.id
       });
        if(!user){
            return {
                error: "Transaction_new",
                code: "NOT_FOUND",
                message: "sender don't exist",
                status: 404
            }
        }
        if(user.currentTransaction){
            return {
                code: "OPERATION_SUCCESS",
                message: "OPERATION_SUCCESS",
                response: user.currentTransaction ,
                status: 200
            }
        }
        const etp = await ModelControllers['entreprise'].option.model.findOne();
        if(!etp){
            return {
                error: "Transaction_new",
                code: "NOT_FOUND",
                message: "entreprise don't exist",
                status: 404
            }
        }
        const res = await ModelControllers['transaction']()['store']({
            ...ctx,
            service:'create',
            data:{
                senderAccount:ctx.login.id,
                receiverContact:ctx.data.receiverContact,
                status:'start',
                codePromo:ctx.data.receiverContact,
            }
        });
        return res;
    },
    wait: async (ctx: ContextSchema): ResponseSchema => {
       return await  updateTransaction(ctx ,'start', 'wait')
    },
    run: async (ctx: ContextSchema): ResponseSchema => {
        return await  updateTransaction(ctx ,'wait', 'run')
    },
    end: async (ctx: ContextSchema): ResponseSchema => {
        return await  updateTransaction(ctx ,'run', 'end')
    },
    add: async (ctx: ContextSchema): ResponseSchema => {
        return await  updateTransaction(ctx ,'run', 'end')
    },
}

async function updateTransaction(ctx:ContextSchema , lastVal:string ,  newVal:string){
    const transaction = await ModelControllers['transaction'].option.model.findOne({
        _id:ctx.data.id
    });
    if(!transaction){
        return {
            error: "Transaction_new",
            code: "NOT_FOUND",
            message: "transaction don't exist",
            status: 404
        }
    }
    if(transaction.status != lastVal){
        return {
            error: "Transaction_new",
            code: "NOT_FOUND",
            message: `status <${lastVal}> is required to get status<${newVal}>`,
            status: 404
        }
    }
    const res = await ModelControllers['transaction']()['update']({
        ...ctx,
        __permission:'admin',
        service:'update',
        data:{
            id:ctx.data.id,
            status:newVal,
        }
    });
    return res;
}
const ctrlMaker = CtrlManager({
    ctrl: { Transaction },
    access: {
        like: "any"
    }
})

ctrlMaker.post('like', async (e) => { })
