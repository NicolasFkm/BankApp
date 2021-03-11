import { IDeposit } from '@models/Deposit';
import { IPayment } from '@models/Payment';
import { IWithdraw } from '@models/Withdraw';
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IAccount extends Document {
    name: string;
    password: string;
    balance: number;
    withdrawals?: IWithdraw[];
    deposits?: IDeposit[];
    payments?: IPayment[];
}

const accountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    withdrawals: {
        type: Schema.Types.ObjectId,
        ref: "Withdraw"
    },
    deposits: {
        type: Schema.Types.ObjectId,
        ref: "Deposit"
    },
    payments: {
        type: Schema.Types.ObjectId,
        ref: "Payment"
    }
},
    {
        timestamps: { createdAt: true, updatedAt: true }
    });

export default mongoose.model<IAccount>('Accounts', accountSchema);