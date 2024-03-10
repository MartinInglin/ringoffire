import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface GameJson {
  players: string[];
  stack: string[];
  playedCards: string[];
  currentPlayer: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  firestore: Firestore = inject(Firestore);

  unsubGames;
  unsubGame;

  constructor() {
    this.unsubGames = onSnapshot(this.getGamesRef(), (games) => {
      games.forEach((game) => {
        console.log('Current data: ', game.id);
      });
    });
    this.unsubGame = onSnapshot(this.getGameRef('asdf'), (game) => {
      console.log('Current data: ', game);
    });
  }

  ngOnDestroy(): void {
    this.unsubGames();
    this.unsubGame();
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getGameRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }

  async addNewGame(game: GameJson) {
    const docRef = await addDoc(collection(this.firestore, 'games'), {
      game: game,
    });
    console.log('Document written with ID: ', docRef);
  }
}
