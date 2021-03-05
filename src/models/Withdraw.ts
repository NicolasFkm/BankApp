import { Optional, Model, Association, DataTypes, Sequelize, HasOneGetAssociationMixin } from "sequelize";
import { Account } from './Account';

export interface WithdrawAttributes {
	id: number;
	description?: string;
	value: number;
}

export interface WithdrawCreationAttributes extends Optional<WithdrawAttributes, "id"> { }

export class Withdraw extends Model<WithdrawAttributes, WithdrawCreationAttributes>{
    public id!: number;
    public description?: string;
	public value: number;;

    public account: Account;

    public getAccount: HasOneGetAssociationMixin<Account>;

    public static associations: {
		account: Association<Account, Withdraw>,
	};
}

export const initWithdraw = (sequelize: Sequelize) => {
	Withdraw.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			description: {
				type: new DataTypes.STRING(255),
				allowNull: false,
                unique: true
			},
			value: {
				type: DataTypes.DECIMAL
			}
		},
		{
			tableName: "Withdraw",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateWithdraw = () => {
	Withdraw.belongsTo(Account);
};