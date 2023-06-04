import mongoose from "mongoose";
import { ContextSchema } from "../lib/squery/Context";
import { SQuery } from "../lib/squery/SQuery";
import Log from "sublymus_logger";


class EmailConfirmartion {
  _error = '';
  _id = '';
  constructor(){
    this._id = new mongoose.Types.ObjectId().toString();
  }
  async confirm(ctx: ContextSchema){
    const res = await new Promise<boolean>((rev,rej)=>{
      const d:any[] = [];
      let i = 0;
      const listener = (r:any)=>{
        d.push(r);
        i++;
        if(i>10){
          sup(true)
        }
        ctx.socket?.emit('ert',{
          i,
          id :this._id
        } , listener);
      }
  
      const sup = (b:boolean)=>{
        Log('__d__',{d , b});
        rev(b);
        clearInterval(_id);
      }
      ctx.socket?.emit('ert',{
        i,
        id :this._id
      } , listener);
      const start = Date.now()+10_000;

      const _id = setInterval(() => {
        let t = start-Date.now();
        t = t < 0 ? 0: t;
        ctx.socket?.emit('time',{
          t,
          id :this._id
        });
        if(t<=0){
          sup(false);
          this._error = 'time out'
        }
      }, 1000);

    });
    return res
  }
  error() {
    return this._error
  };
}
class LoginConfirmartion {
  _error = '';
  _id = '';
  constructor(){
    this._id = new mongoose.Types.ObjectId().toString();
  }
  async confirm(ctx: ContextSchema){
    
    ctx.socket?.emit('log', 'salut');
    return true;
  }
  error() {
    return this._error
  };
}

SQuery.auth({
  login: "account",
  //loginExtension: [LoginConfirmartion],
  //signupExtension: [EmailConfirmartion],
  match: ["telephone", "password"],
  signup: "user",
});

SQuery.auth({
  login: "account",
  // loginExtension: [LoginConfirmartion],
  // signupExtension: [EmailConfirmartion],
  match: ["telephone", "password"],
  signup: "manager",
});
