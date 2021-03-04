import { Optional, Model, Association, DataTypes, Sequelize, HasOneGetAssociationMixin } from "sequelize";
import { Account } from './Account';

export interface DepositAttributes {
	id: number;
	value: number;
}

export interface DepositCreationAttributes extends Optional<DepositAttributes, "id"> { }

export class Deposit extends Model<DepositAttributes, DepositCreationAttributes>{
    public id!: number;
	public value: number;;

    public account: Account;

    public getAccount: HasOneGetAssociationMixin<Account>;

    public static associations: {
		account: Association<Account, Deposit>,
	};
}

export const initDeposit = (sequelize: Sequelize) => {
	Deposit.init(
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
			tableName: "Deposit",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateDeposit = () => {
	Deposit.belongsTo(Account);
};