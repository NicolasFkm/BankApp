import axios from 'axios';
import SelicTax, { SelicData } from '@models/SelicTax';

export default class SelicService {
    private baseUrl: string = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/formato=json";
    
    private format: string = "formato=json";

    private intervalNumber: number = 1;

    public getLatestTax = async (): Promise<SelicTax|null> => {
        let {status, data} = await axios.get<SelicData[]>(`${this.baseUrl}${this.intervalNumber}?${this.format}`);
        
        if(status != 200 || data.length == 0 ){
            return null;
        }

        const selicData: SelicData = data[0];
        
        const selic = new SelicTax(selicData)

        return selic;
    }
}