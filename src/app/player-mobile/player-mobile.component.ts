import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss',
})
export class PlayerMobileComponent {
  @Input() name: string = '';
  @Input() indexOfImage!:number;
  @Input() i!: number;
  @Input() playerActive: boolean = false;

  get adjustedIndex(): number {
    return this.i % 6;
  }
}
