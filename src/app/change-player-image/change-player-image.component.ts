import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../../firebase-services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-player-image',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './change-player-image.component.html',
  styleUrl: './change-player-image.component.scss',
})
export class ChangePlayerImageComponent {
  indexOfPlayer;
  playerName = '';
  game;
  newPlayer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService,
    private dialogRef: MatDialogRef<ChangePlayerImageComponent>
  ) {
    this.indexOfPlayer = this.data.index;
    this.game = this.data.game;
    this.playerName = this.data.players[this.indexOfPlayer] || '';
    this.newPlayer = this.data.newPlayer;
  }

  imagesPlayer = [
    'assets/images/avatar-0.png',
    'assets/images/avatar-1.png',
    'assets/images/avatar-2.png',
    'assets/images/avatar-3.png',
    'assets/images/avatar-4.png',
    'assets/images/avatar-5.png',
  ];

  deletePlayer() {
    this.gameService.deletePlayer(this.indexOfPlayer);
    this.dialogRef.close();
  }

  saveChanges() {
    if (this.newPlayer) {
      this.game.players.push(this.playerName);
    } else {
      this.game.players[this.indexOfPlayer] = this.playerName;
    }
    this.gameService.saveGame(this.game);
    this.dialogRef.close();
  }
}
