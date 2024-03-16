import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../firebase-services/game.service';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { ChangePlayerImageComponent } from '../change-player-image/change-player-image.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    GameInfoComponent,
    PlayerMobileComponent,
    ChangePlayerImageComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  providers: [Game],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(
    @Inject(Game) game: Game,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private gameService: GameService
  ) {
    this.gameId = '';
    this.getGameId();
    this.game = game;
    this.gameService.getGame().subscribe((game) => {
      this.game.currentPlayer = game.currentPlayer;
      this.game.stack = game.stack;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    });
  }

  ngOnInit(): void {}

  getGameId() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });
    this.gameService.gameId = this.gameId;
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      if (this.game.stack.length > 0) {
        this.game.currentCard = this.game.stack.pop() as string;
        this.game.pickCardAnimation = true;
      }
    }
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    this.gameService.saveGame(this.game);
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.gameService.saveGame(this.game);
    }, 1250);
  }

  dialogNewPlayer(): void {
    const dialogRef = this.dialog.open(ChangePlayerImageComponent, {
      data: {
        index: this.game.players.length,
        game: this.game,
        players: this.game.players,
        newPlayer: true,
      },
    });
  }

  change(indexOfPlayer: number) {
    const dialogRef = this.dialog.open(ChangePlayerImageComponent, {
      data: {
        index: indexOfPlayer,
        game: this.game,
        players: this.game.players,
        newPlayer: false,
      },
    });
  }
}
