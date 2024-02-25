import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})

export class StartScreenComponent {

  constructor(private router: Router) {

  }

  newGame() {
    this.router.navigateByUrl('/game');
  }
  

}
