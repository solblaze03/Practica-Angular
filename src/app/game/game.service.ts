import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './models/game';
import { GAME_DATA } from './models/mock-games';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  private readonly URL = environment.api;

  constructor(private http :HttpClient) { }

  getGames(title? : string, categoryId? : number) : Observable<Game[]> {
    return this.http.get<Game[]>(this.composeFindUrl(title, categoryId))
  }

  saveGame(game: Game) : Observable<void> {
    let url = `${this.URL}/game`;

    if(game.id != null){
      url += '/'+ game.id
    }
    return this.http.put<void>(url, game)
  }


  composeFindUrl(title? : String, categoryId? : number) : string{
    let params = '';

    if(title != null){
      params += 'title='+title;
    }

    if(categoryId != null){
      if(params!= '') params+= "&";
      params += "idCategory="+categoryId
    }

    let url = `${this.URL}/game`
    if(params == ''){
      return url
    }else{
      return url + '?'+ params;
    }

  }

}
