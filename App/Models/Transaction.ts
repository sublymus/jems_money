import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import { Config } from "../../lib/squery/Config";
import DiscussionModel from "./DiscussionModel";
import AccountModel from "./AccountModel";
import ContactModel from "./ContactModel";

const TransactionSchema = SQuery.Schema({
  /// start
  senderAccount: {
    type: Schema.Types.ObjectId,
    ref:AccountModel.modelName,
    impact:false,
    strictAlien:true,
    access:'admin',
  },
  //full
  receiverContact: {
    type: Schema.Types.ObjectId,
    ref: ContactModel.modelName,
    impact:false,
    strictAlien:true,
    access:'admin',
  },
  codePromo: {
    type: String,
    access:'admin',
  },
  sum:{
    type: Number,
    access:'admin',
  },
  //full
  senderFile: [{
    type: String,
    file: {
      length: [0, 4],
      type: ['*/*'],
      size: [1, 4e7],
      dir: Config.conf.rootDir + '/fs',
    },
    access:'admin',
  }],

  // run 
  manager: {
    type: Schema.Types.ObjectId,
    impact:false,
    ref: 'manager',
    access:'admin',
  },
  
  //end
  managerFile: [{
    type: String,
    file: {
      length: [0, 4],
      type: ['*/*'],
      size: [0, 4e7],
      dir: Config.conf.rootDir + '/fs',
    },
    access:'admin',
  }],
  
  discussion:{
    type:Schema.Types.ObjectId,
    ref:DiscussionModel.modelName,
    access:'admin',
  },
  status:{
    type:String,
    enum:['start','full','run','end','cancel'],
    access:'admin',
  }
});
export const TransactionModel = mongoose.model("transaction", TransactionSchema);

const maker = MakeModelCtlForm({
  model: TransactionModel,
  schema: TransactionSchema,
  volatile: false,
});

export default TransactionModel;
