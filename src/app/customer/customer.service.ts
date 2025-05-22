import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './model/Customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }
  

  getCustomer(): Observable<any>{
    return this.http.get<Customer[]> (`${this.URL}/customer`);
  }

  saveCustomer(customer : Customer) : Observable<any> {
    let url = `${this.URL}/customer`
    if(customer.id != null){
      url+= "/"+customer.id
      
    }
  
    return this.http.put<Customer>(url, customer)
  }

  deleteCustomer(idCustomer : number){
    const url = `${this.URL}/customer/`;
    return this.http.delete<Customer>(url+idCustomer)
  }
}
