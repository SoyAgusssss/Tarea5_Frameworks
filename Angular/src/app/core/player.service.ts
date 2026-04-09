import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Player {
  _id?: string;
  usuario: string;
  email: string;
  password?: string;
  rol?: 'usuario' | 'admin' | 'capitan' | 'arbitro';
  equipo?: string;
  deporte?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = `${environment.apiUrl}/players`;

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  createPlayer(player: Player): Observable<any> {
    return this.http.post<any>(this.apiUrl, player);
  }
}
