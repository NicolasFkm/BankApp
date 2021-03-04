import { Sequelize } from "sequelize";
import * as path from 'path';
import { associatePayment, initPayment } from "@models/Payment";
import { associateWithdraw, initWithdraw } from "@models/Withdraw";
import { associateDeposit, initDeposit } from "@models/Deposit";
import { associateAccount, initAccount } from "@models/Account";

export const initSequelize = ()=>{
    const databasePath = path.join(__dirname, process.env.DATABASE_NAME!);
    
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: databasePath,
        logging: (...msg) => console.log(`[SEQUELIZE] ${msg}`),
        pool: {
            max: 5,
            min: 0,
            idle: 15000,
            acquire: 20000
        }
    });
    
    return sequelize;
};

export const configDB = (sequelize: Sequelize) => {
    initPayment(sequelize);
    initWithdraw(sequelize);
    initDeposit(sequelize);
    initAccount(sequelize);
    associatePayment();
    associateWithdraw();
    associateDeposit();
    associateAccount();
}
