import mongoose, { Schema, model, Document } from 'mongoose';

export interface IWithdraw extends Document {
    value: number;
    account: Account;
}

const withdrawSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
},
    {
        timestamps: { createdAt: true, updatedAt: true }
    });

export default mongoose.model<IWithdraw>('Withdrawals', withdrawSchema);