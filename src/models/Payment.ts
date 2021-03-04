import { Association, DataTypes, HasOneGetAssociationMixin, Model, Optional, Sequelize } from "sequelize";
import { Account } from "./Account";

export interface PaymentAttributes {
	id: number;
    value: number;
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> { }

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>{
    public id!: number;
    public value: number;
    
    public account?: Account;

    public getAccount!: HasOneGetAssociationMixin<Account>;

    public static associations: {
		account: Association<Account, Payment>
	};
}

export const initPayment = (sequelize: Sequelize) => {
	Payment.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            value: {
                type: DataTypes.DECIMAL
            }
		},
		{
			tableName: "Payment",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associatePayment = () => {
	Payment.belongsTo(Account);
};