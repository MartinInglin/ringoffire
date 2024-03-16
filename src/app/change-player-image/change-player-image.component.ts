import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
export class ChangePlayerImageComponent implements OnInit {
  indexOfPlayer;
  playerName = '';
  game;
  newPlayer;
  highlightedImages: boolean[];
  indexOfImage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService,
    private dialogRef: MatDialogRef<ChangePlayerImageComponent>
  ) {
    this.indexOfPlayer = this.data.index;
    this.game = this.data.game;
    this.playerName = this.data.players[this.indexOfPlayer]?.name || '';
    this.newPlayer = this.data.newPlayer;
    this.highlightedImages = new Array(this.imagesPlayer.length).fill(false);
    this.indexOfImage = 0;
  }

  imagesPlayer = [
    'assets/images/avatar-0.png',
    'assets/images/avatar-1.png',
    'assets/images/avatar-2.png',
    'assets/images/avatar-3.png',
    'assets/images/avatar-4.png',
    'assets/images/avatar-5.png',
  ];

  ngOnInit(): void {
    // Check if the selectedImageIndex is valid and within the range of imagesPlayer
    if (this.indexOfImage !== undefined && this.indexOfImage >= 0 && this.indexOfImage < this.imagesPlayer.length) {
      // Highlight the selected image
      this.highlightedImages[this.indexOfImage] = true;
    }
  }

  deletePlayer() {
    this.gameService.deletePlayer(this.indexOfPlayer);
    this.dialogRef.close();
  }

  saveChanges() {
    if (this.playerName.length > 0) {
      if (this.newPlayer) {
        this.game.players.push({ name: this.playerName, imageNumber: this.indexOfImage });
      } else {
        this.game.players[this.indexOfPlayer] = { name: this.playerName, imageNumber: this.indexOfImage };


      }
      this.gameService.saveGame(this.game);
      this.dialogRef.close();
    }
  }

  highlightImage(indexOfImage: number) {
    this.indexOfImage = indexOfImage;
    this.highlightedImages.fill(false);
    this.highlightedImages[indexOfImage] =
      !this.highlightedImages[indexOfImage];
  }
}
