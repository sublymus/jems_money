import mongoose from "mongoose";
import { MakeModelCtlForm } from "../../lib/squery/ModelCtrlManager";
import { SQuery } from "../../lib/squery/SQuery";
import { Config } from "../../lib/squery/Config";

let AccountSchema = SQuery.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "trop court"],
        maxlength: [20, "trop long"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4,
        access: "private",
    },
    telephone: {
        type: String,
        required: true,
        unique: true,
    },
    carte: {
        type: String,
        required: true,
    },
    imgProfile: [{
        type: String,
        file: {
            size: [1, 4e7],
            length: [0, 4],
            dir: Config.conf.rootDir + '/fs',
        }
    }]
});

const AccountModel = mongoose.model("account", AccountSchema);

MakeModelCtlForm({
    schema: AccountSchema,
    model: AccountModel,
    volatile: false,
});
export default AccountModel;