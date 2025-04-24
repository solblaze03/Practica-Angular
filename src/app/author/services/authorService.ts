import { Injectable } from "@angular/core";
import { Pageable } from '../../core/model/Pageable';
import { Observable, of } from "rxjs";
import { AuthorPage } from "src/app/core/model/AuthorPage";
import { AUTHOR_DATA } from "../model/AUTHOR_DATA";
import { Author } from "../model/Author";
import { HttpClient } from '@angular/common/http';
import { AUTHOR_DATA_LIST } from "../model/mock-author-list";
import { environment } from "src/environments/environment";



@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthorService {
    constructor(
        private HttpClient : HttpClient
    ) {}

    private readonly URL = environment.api;

    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        
        return this.HttpClient.post<AuthorPage>(`${this.URL}/author`, {pageable: pageable});
    }

    saveAuthor(author: Author) : Observable<void> {
        let url = `${this.URL}/author`;
        if(author.id != null){
            url += "/"+author.id
        }

        return this.HttpClient.put<void>(url, author)
    }

    deleteAuthor(idAuthor: number): Observable<void>{
        return this.HttpClient.delete<void>(`${this.URL}/author`+ idAuthor)
    }

    getAllAuthors(): Observable<Author[]> {
        return this.HttpClient.get<Author[]>(`${this.URL}/author`)
    }
}