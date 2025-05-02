import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from '../model/Loan';
import { LOAN_DATA } from '../model/Mock-Loans';
import { Pageable } from '../../core/model/Pageable';
import { HttpClient } from '@angular/common/http';
import { LoanPage } from 'src/app/core/model/LoanPage';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  private readonly URL = environment.api

  constructor(private http : HttpClient) { }

  getLoans(pageable: Pageable, titleGame?: string, nameCustomer?: string, daySelected?: string) : Observable<LoanPage>{
    return this.http.post<LoanPage>(this.composeFindUrl(titleGame,nameCustomer,daySelected), {pageable: pageable})
  }

  save(loan : Loan){
    return this.http.put<void>(`${this.URL}/loan`, loan)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.URL}/loan/${id}`)
  }

  composeFindUrl(title? : string, name?: string, daySelected?: string) : string{
    let params = ''
    

    if(title != null){
      params += 'title='+title;
    }

    if(name != null){

      if(params != '') params+= "&"

      params += 'customer='+name

    }

    if(daySelected != null){
      if (params != '') params += "&"
      params+= 'date='+daySelected
    }

    let url = `${this.URL}/loan`
    console.log(url+"?"+params)

    if(params == ''){
      return url
    }else{
     
      return url + "?" + params
    }
  }

}
