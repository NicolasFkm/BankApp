// TODO: Create worker/thread pool to handle daily income apply
// import workerpool from 'workerpool';
// const pool = workerpool.pool();

import * as schedule from "node-schedule";
import AccountService from "@services/AccountService";
import SelicService from "@services/SelicService";

export default class IncomeWorker {
    public accountService: AccountService;
    public selicService: SelicService;

    constructor() {
        this.accountService = new AccountService();
        this.selicService = new SelicService();
    }

    public BuildDefaultRecurrenceRule = (): schedule.RecurrenceRule => {
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 1;
        rule.minute = 0;
        rule.tz = 'America/Sao_Paulo';

        return rule;
    }

    public Schedule = async (rule: schedule.RecurrenceRule|string) => {

        schedule.scheduleJob(rule, async () => {
            try {
                const accounts = await this.accountService.getAll();
                const selic = await this.selicService.getLatestTax();
                const selicValue = selic?.taxValue! / 100;

                accounts.map(async account => {
                    try{
                        const result = await this.accountService.processIncome(account.id, selicValue!);
                        if(!result){
                            throw new Error(`Couldn't apply income in account [${account.id}]`)
                        }
                    }
                    catch(Err){
                        console.log("[Schedule] error during income apply: " + Err);
                    }
                });
            }
            catch (error) {
                console.log("[Schedule] error during income apply: " + error);
            }
        });

    }
}