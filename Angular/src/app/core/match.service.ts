import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Match {
  _id?: string;
  deporte: string;
  equipo1: string;
  equipo2: string;
  goles1?: number;
  goles2?: number;
  puntos1?: number;
  puntos2?: number;
  fecha: string;
  arbitro: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private apiUrl = `${environment.apiUrl}/matches`;

  constructor(private http: HttpClient) {}

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(this.apiUrl, match);
  }

  updateMatch(id: string, data: Partial<Match>): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/${id}`, data);
  }
}


