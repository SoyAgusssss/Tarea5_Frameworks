import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlayerService, Player } from '../player.service';
import { environment } from '../../../environments/environment';

const jExpect = <T>(actual: T) => expect(actual) as unknown as jasmine.Matchers<T>;
const mockPlayers: Player[] = [
  {
    _id: '1',
    usuario: 'Prueba1',
    email: 'prueba1@test.com',
    rol: 'capitan',
    equipo: 'Equipo1',
    deporte: 'futbol'
  },
  {
    _id: '2',
    usuario: 'Prueba2',
    email: 'prueba2@test.com',
    rol: 'usuario',
    equipo: 'Equipo2',
    deporte: 'futbol'
  }
];

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/players`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(PlayerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('obtiene la lista de jugadores', () => {
    service.getPlayers().subscribe((players: Player[]) => {
      jExpect(players.length).toBe(2);
      jExpect(players[0].usuario).toBe('Prueba1');
      jExpect(players).toEqual(mockPlayers as Player[]);
    });

    const req = httpMock.expectOne(apiUrl);
    jExpect(req.request.method).toBe('GET');

    req.flush(mockPlayers);
  });

  it('debe crear un jugador', () => {
    const newPlayer: Player = {
      usuario: 'Prueba3',
      email: 'prueba3@test.com',
      password: '123456',
      rol: 'usuario',
      equipo: 'Equipo3',
      deporte: 'futbol'
    };

    const fakeResponse = {
      ok: true,
      message: 'Jugador creado',
      player: { ...newPlayer, _id: '3' }
    };

    service.createPlayer(newPlayer).subscribe((res: any) => {
      jExpect(res.ok).toBeTrue();
      jExpect(res.player._id).toBe('3');
      jExpect(res.player.usuario).toBe('Prueba3');
    });

    const req = httpMock.expectOne(apiUrl);
    jExpect(req.request.method).toBe('POST');
    jExpect(req.request.body).toEqual(newPlayer);

    req.flush(fakeResponse);
  });
});