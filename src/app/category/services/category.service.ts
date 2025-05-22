import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private readonly URL = environment.api;
  
  constructor(private httpClient: HttpClient) {}


  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.URL}/category`);
  }

  saveCategories(category: Category): Observable<any> {
    let url = `${this.URL}/category`;
    if (category.id != null) {
      url += '/' + category.id;
    }
    return this.httpClient.put<Category>(url, category);
  }

  deleteCategory(idCategory: number) {
    const url = `${this.URL}/category/`;
    return this.httpClient.delete<Category>(url + idCategory);
  }
}
