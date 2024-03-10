import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { Router } from '@angular/router';
import { GameService } from '../../firebase-services/game.service';
import { Game } from '../../models/game';
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
  providers: [Game],
})
export class StartScreenComponent {
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
