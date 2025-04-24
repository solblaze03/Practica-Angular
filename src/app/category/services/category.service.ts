import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/Category';
import { Category_DATA } from '../model/mock-categories';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  private readonly URL = environment.api;

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.URL}/category`);
  }

  saveCategories(category: Category): Observable<any> {
    let url = `${this.URL}/category`;
    if(category.id != null){
      url += '/'+category.id
    }
    return this.httpClient.put<Category>(url, category)
  }

  deleteCategory(idCategory: number){
    let url = `${this.URL}/category/`;
    return this.httpClient.delete<Category>(url+idCategory)
  }

}
