import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import ManagerModel from "./ManagerModel";
import { Config } from "../../lib/squery/Config";
import DiscussionModel from "./DiscussionModel";
import AccountModel from "./AccountModel";
import ContactModel from "./ContactModel";

const TransactionSchema = SQuery.Schema({
  
  sender: {
    type: Schema.Types.ObjectId,
    ref:AccountModel.modelName,
    impact:false,
    required: true,
    strictAlien: true,
    access:'admin',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: ContactModel.modelName,
    impact:false,
    strictAlien: true,
    access:'admin',
  },
  receiverCompte: {
    type: String,
    required: true,
    access:'admin',
  },
  manager: {
    type: Schema.Types.ObjectId,
    impact:false,
    ref: ManagerModel.modelName,
    strictAlien: true,
    required: true,
    access:'admin',
  },
  senderFile: [{
    type: String,
    required: true,
    file: {
      length: [0, 4],
      type: ['*/*'],
      size: [1, 4e7],
      dir: Config.conf.rootDir + '/fs',
    },
    access:'admin',
  }],
  managerFile: [{
    type: String,
    required: true,
    file: {
      length: [0, 4],
      type: ['*/*'],
      size: [0, 4e7],
      dir: Config.conf.rootDir + '/fs',
    },
    access:'admin',
  }],
  codePromo: {
    type: String,
    access:'admin',
  },
  serviceCharge: {
    type: Number,
    required: true,
    access:'admin',
  },
  orgServiceCharge: {
    type: Number,
    required: true,
    access:'admin',
  },
  ristourne: {
    type: Number,
    access:'admin',
  },
  sendingDiff:{
    type:Number,
    required:true,
    access:'admin',
  },
  confirmDiff:{
    type:Number,
    required:true,
    access:'admin',
  },
  confirmDate:{
    type:Number,
    required:true,
    access:'admin',
  },
  discussion:{
    type:Schema.Types.ObjectId,
    ref:DiscussionModel.modelName,
    required:true,
    access:'admin',
  },
  status:{
    type:String,
    enum:['start','wait','run','end'],
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
