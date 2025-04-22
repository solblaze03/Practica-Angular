import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/Category';
import { Category_DATA } from '../model/mock-categories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>("http://192.168.18.64:8081/category");
  }

  saveCategories(category: Category): Observable<any> {
    let url = "http://192.168.18.64:8081/category";
    if(category.id != null){
      url += '/'+category.id
    }
    return this.httpClient.put<Category>(url, category)
  }

  deleteCategory(idCategory: number){
    let url = "http://192.168.18.64:8081/category/";
    return this.httpClient.delete<Category>(url+idCategory)
  }

}
