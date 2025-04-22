import { Injectable } from "@angular/core";
import { Pageable } from '../../core/model/Pageable';
import { Observable, of } from "rxjs";
import { AuthorPage } from "src/app/core/model/AuthorPage";
import { AUTHOR_DATA } from "../model/AUTHOR_DATA";
import { Author } from "../model/Author";
import { HttpClient } from '@angular/common/http';



@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthorService {
    constructor(
        private HttpClient : HttpClient
    ) {}

    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        console.log(pageable)
        return this.HttpClient.post<AuthorPage>("http://192.168.18.64:8081/author", {pageable: pageable})
    }

    saveAuthor(author: Author) : Observable<void> {
        let url = "http://192.168.18.64:8081/author";
        if(author.id != null){
            url += "/"+author.id
        }

        return this.HttpClient.put<void>(url, author)
    }

    deleteAuthor(idAuthor: number): Observable<void>{
        return this.HttpClient.delete<void>('http://192.168.18.64:8081/author/'+ idAuthor)
    }
}