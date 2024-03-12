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

  constructor(private route: ActivatedRoute) {}

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

  getGame(gameId: string): Observable<GameJson> {
    const gameRef = this.getGameRef(gameId);
    return docData(gameRef) as Observable<GameJson>;
  }

  async saveGame(gameId: string, game: Game) {
    const gameRef = this.getGameRef(gameId);
    const gameObject = { ...game };
    await updateDoc(gameRef, gameObject);
  }

  getGameId(gameId: string) {
    this.route.params.subscribe((params) => {
      gameId = params['id'];
    });
  }
}
