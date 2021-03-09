import mongoose, { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
    description?: string;
    value: number;
    account: Account;
}

const paymentSchema = new Schema({
    description: {
        type: String,
        required: false
    },
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

export default mongoose.model<IPayment>('Payments', paymentSchema);