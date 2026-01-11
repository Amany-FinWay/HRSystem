import { PrintersStatusModel } from "./PrintersStatusModel";

export interface ActivePrinterModel {
    online: boolean;
    status: PrintersStatusModel;
}