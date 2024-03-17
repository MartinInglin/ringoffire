import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { Router } from '@angular/router';
import { GameService } from '../../firebase-services/game.service';
import { Game } from '../../models/game';
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
  providers: [Game],
})
export class GameOverComponent {
  game: Game;

  constructor(
    @Inject(Game) game: Game,
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.game = game;
  }


  async newGame() {
    this.game = new Game();
    const gameId = await this.gameService.addNewGame(this.game.toJson());
    this.router.navigateByUrl('/game/' + gameId);
  }
}
