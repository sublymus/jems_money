import mongoose, { Schema } from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import { Config } from "../../lib/squery/Config";
import DiscussionModel from "./DiscussionModel";
import AccountModel from "./AccountModel";
import CountryModel from "./CountryModel";

const TransactionSchema = SQuery.Schema({
  /// start
  senderAccount: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    impact: false,
    strictAlien: true,
    access: 'admin',
  },
  //full
  country: {
    type: Schema.Types.ObjectId,
    ref: CountryModel.modelName,
    strictAlien: true,
    impact: false,
  },
  receiverName:{
    type:String
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
  codePromo: {
    type: String,
    access: 'admin',
  },
  sum: {
    type: Number,
    access: 'admin',
  },
  //full
  senderFile: [{
    type: String,
    file: {
      length: [0, 4],
      type: ['*/*'],
      size: [1, 4e7],
      dir: [Config.conf.rootDir,'fs'],
    },
    access: 'admin',
  }],

  // run 
  manager: {
    type: Schema.Types.ObjectId,
    impact: false,
    ref: AccountModel.modelName,
    access: 'admin',
  },

  //end
  managerFile: [{
    type: String,
    file: {
      length: [0, 4],
      type: ['*/*'],
      size: [0, 4e7],
      dir:[Config.conf.rootDir,'fs'],
    },
    access: 'admin',
  }],

  discussion: {
    type: Schema.Types.ObjectId,
    ref: DiscussionModel.modelName,
    access: 'admin',
  },
  status: {
    type: String,
    enum: ['start', 'full', 'run', 'end', 'cancel'],
    access: 'admin',
  }
});
export const TransactionModel = mongoose.model("transaction", TransactionSchema);

/*


const transaction = await SQuery.newInstance('transaction',{id: res.response});

transaction.when('refresh:manager',(manager)=>{
  notifyJoinManager();
})
transaction.when('refresh:status',(status)=>{
  dispatch(setStatus(status));
})

INSTANCE.when('refresh:PROPERTY',(PROPERTY_VALUE)=>{
  // PROPERTY_VALUE
});
INSTANCE.when('refresh:PROPERTY',(PROPERTY_VALUE)=>{
  // PROPERTY_VALUE
});


*/

//createAsyncThunk


const maker = MakeModelCtlForm({
  model: TransactionModel,
  schema: TransactionSchema,
  volatile: false,
});

export default TransactionModel;
