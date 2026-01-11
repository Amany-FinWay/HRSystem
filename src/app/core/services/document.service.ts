import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { AvailablePrintersModel } from '../../shared/models/interfaces/AvailablePrinters.model';
import { ActivePrinterModel } from '../../shared/models/interfaces/ActivePrinterModel';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  public ListPrinters(): Observable<AvailablePrintersModel[]> {
    return this.httpClient.get<AvailablePrintersModel[]>('/a4printer/list');
  }

  public GetActivePrinter(index: number): Observable<ActivePrinterModel> {
    return this.httpClient.get<ActivePrinterModel>(`${'a4printer/status?index='}${index}`);
  }

  public PrintDocument(filePath: string, index: number) {
    return this.httpClient.post(`${'a4printer/printpdf?pdf_path='}${filePath}&index=${index}`, {});
  }
}
