import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  addDoc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../models/game';
import { arrayRemove } from '@angular/fire/firestore';

interface GameJson {
  players: string[];
  stack: string[];
  playedCards: string[];
  currentPlayer: number;
  pickCardAnimation: boolean;
  currentCard: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  firestore: Firestore = inject(Firestore);
  gameId: string;

  constructor(private route: ActivatedRoute) {
    this.gameId = '';
  }

  ngOnDestroy(): void {}

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getGameRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }

  async addNewGame(game: GameJson): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, 'games'), game);
    return docRef.id;
  }

  getGame(): Observable<GameJson> {
    const gameRef = this.getGameRef(this.gameId);
    return docData(gameRef) as Observable<GameJson>;
  }

  async saveGame(game: GameJson) {
    const gameRef = this.getGameRef(this.gameId);
    const gameObject = { ...game };
    await updateDoc(gameRef, gameObject);
  }

  async deletePlayer(indexOfPlayer: number) {
    const gameRef = doc(this.firestore, 'games', this.gameId);
    let gameData: GameJson;

    const sub = this.getGame().subscribe((game) => {
      gameData = game;
      gameData.players.splice(indexOfPlayer, 1);
      sub.unsubscribe();

      this.saveGame(gameData);
    });
  }
}
