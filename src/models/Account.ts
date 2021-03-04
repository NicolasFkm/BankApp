import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional, Sequelize } from "sequelize";
import { Payment } from "./Payment";
import { Withdraw } from "./Withdraw";
import { Deposit } from "./Deposit";

export interface AccountAttributes {
	id: number;
	name: string;
    accountNumber: number;
    password: string;
}

export interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> { }

export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
    public id!: number;
    public name!: string;
    public accountNumber: number;
    public password: string;
    
    public payments: Payment[];
    public withdrawals: Withdraw[];
    public deposits: Deposit[];

    public createPayment!: HasManyAddAssociationMixin<Payment, number>;
    public getPayment!: HasManyGetAssociationsMixin<Payment>;
    public createWithdraw!: HasManyAddAssociationMixin<Withdraw, number>;
    public getWithdraw!: HasManyGetAssociationsMixin<Withdraw>;
    public createDeposit!: HasManyAddAssociationMixin<Deposit, number>;
    public getDeposit!: HasManyGetAssociationsMixin<Deposit>;

    public static associations: {
		payments: Association<Payment, Account>;
		withdrawals: Association<Withdraw, Account>;
		deposits: Association<Deposit, Account>;
	};
}

export const initAccount = (sequelize: Sequelize) => {
	Account.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            accountNumber:{
                type: DataTypes.TINYINT,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
		},
		{
			tableName: "Account",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateAccount = () => {
	Account.hasMany(Withdraw);
	Account.hasMany(Payment);
	Account.hasMany(Deposit);
};