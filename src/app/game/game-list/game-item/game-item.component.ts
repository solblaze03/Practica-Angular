import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {


  @Input() game: Game;

  constructor(){}

  ngOnInit(){
    
  }

}
