import { HRLetterRequestType } from "../types/HRLetterRequestType.type";
import { Language } from "../types/Language.type";
import { RequestsStatus } from "../types/RequestsStatus.type";

export interface HRLettersModel {
    type: HRLetterRequestType;
    dateRequested: string;
    status: RequestsStatus;
    language: Language;
    directedTo: string;
}