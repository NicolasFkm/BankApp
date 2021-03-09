import mongoose, { Schema, model, Document } from 'mongoose';

export interface IDeposit extends Document {
    value: number;
    account: Account;
}

const depositSchema = new Schema({
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

export default mongoose.model<IDeposit>('Deposits', depositSchema);