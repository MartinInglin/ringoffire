import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { GameOverComponent } from './game-over/game-over.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent},
    { path: 'game/:id', component: GameComponent},
    { path: 'game-over', component: GameOverComponent}
];
