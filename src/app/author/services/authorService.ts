import { Injectable } from '@angular/core';
import { Pageable } from '../../core/model/Pageable';
import { Observable } from 'rxjs';
import { AuthorPage } from 'src/app/core/model/AuthorPage';
import { Author } from '../model/Author';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

 private readonly URL = environment.api;

  constructor(private HttpClient: HttpClient) {}

 
  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return this.HttpClient.post<AuthorPage>(`${this.URL}/author`, {
      pageable: pageable,
    });
  }

  saveAuthor(author: Author): Observable<void> {
    let url = `${this.URL}/author`;
    if (author.id != null) {
      url += '/' + author.id;
    }

    return this.HttpClient.put<void>(url, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.HttpClient.delete<void>(`${this.URL}/author` + idAuthor);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.HttpClient.get<Author[]>(`${this.URL}/author`);
  }
}
