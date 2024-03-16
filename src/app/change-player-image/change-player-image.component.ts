import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-player-image',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './change-player-image.component.html',
  styleUrl: './change-player-image.component.scss',
})

export class ChangePlayerImageComponent {

  indexOfPlayer;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.indexOfPlayer = this.data.index;
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
  }
}
