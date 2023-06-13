import mongoose, { Schema } from "mongoose";
import { Config } from "../../lib/squery/Config";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import AccountModel from "./AccountModel";
import CountryModel from "./CountryModel";
import DiscussionModel from "./DiscussionModel";
import EntrepriseModel from "./EntrepriseModel";
import { ModelControllers, ModelInstanceSchema } from "../../lib/squery/Initialize";

const TransactionSchema = SQuery.Schema({
  /// start
  senderAccount: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
    impact: false,
    strictAlien: true,
    access: "admin",
  },
  /*
  const accountSchema = new Schema({  
    name: String,
    phone: Number,
  })
  const userSchema = new Schema({  
    account: {
    type: Schema.Types.ObjectId,
    ref: 'account',
  }})
  */
  //full
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
    type: String,
  },
  agenceReceiver: {
    type: Schema.Types.ObjectId,
    ref: "agence",
    strictAlien: true,
    impact: false,
  },
  agenceSender: {
    type: Schema.Types.ObjectId,
    ref: "agence",
    strictAlien: true,
    impact: false,
  },
  typeTransaction: {
    type: String,
  },
  codePromo: {
    type: String,
    access: "admin",
  },
  receiverName: {
    type: String,
    trim: true,
    minlength: [3, "trop court"],
    maxlength: [20, "trop long"],
  },
  received: {
    type: {
      value: Number,
      currency: String,
    },
    access: "admin",
  },
  sent: {
    type: {
      value: Number,
      currency: String,
    },
    access: "admin",
  },
  //full

  senderFile: [
    {
      type: SQuery.FileType,
      file: {
        length: [0, 4],
        type: ["*/*"],
        size: [1, 4e7],
        dir: [Config.conf.rootDir, "fs"],
      },
      access: "admin",
    },
  ],

  // run
  manager: {
    type: Schema.Types.ObjectId,
    impact: false,
    ref: AccountModel.modelName,
    access: "admin",
  },

  //end

  managerFile: [
    {
      type: SQuery.FileType,
      file: {
        length: [0, 4],
        type: ["*/*"],
        size: [0, 4e7],
        dir: [Config.conf.rootDir, "fs"],
      },
      access: "admin",
    },
  ],

  discussion: {
    type: Schema.Types.ObjectId,
    ref: DiscussionModel.modelName,
    access: "admin",
  },
  status: {
    type: String,
    enum: ["start", "full", "run", "end", "cancel"],
    access: "admin",
  },
});
export const TransactionModel = mongoose.model(
  "transaction",
  TransactionSchema
);

const maker = MakeModelCtlForm({
  model: TransactionModel,
  schema: TransactionSchema,
});

maker.post('store', async ({ ctx , res }) => {
  const entrepise = await EntrepriseModel.findOne<ModelInstanceSchema>();
  
  if (!entrepise) {
    return {
      code: '',
      message: "",
      status: 0,
      error: 'Ke dal'
    }
  }
  const resListCM = await ModelControllers["transaction"]()["list"]?.({
    ...ctx,
    __permission: "admin",
    __key: ctx.__key,
    data: {
      addId: [res.response.toString()],
      paging: {
        query: {
          __parentModel: `entreprise_${entrepise._id.toString()}_allTransactions_transaction`,
        },
      },
    },
  });
})

export default TransactionModel;
