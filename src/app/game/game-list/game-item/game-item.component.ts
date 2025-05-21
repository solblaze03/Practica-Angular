import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent{


  @Input() game: Game;

  constructor(){}

  

}
