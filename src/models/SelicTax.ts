import moment from "moment";

export default class SelicTax{
    public date: Date;
    public taxValue: number;

    constructor(responseData: SelicData){
        let date = moment(responseData.data, "DD/MM/YYYY").toDate();
        this.date = date;
        this.taxValue = responseData.valor;
    }
}

export class SelicData{
    public data: string;
    public valor: number;
}