/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersComponent } from './players.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlayerService } from '../../core/player.service';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

const playerServiceMock = {
  getPlayers: jasmine.createSpy('getPlayers')
};



/* ----------------------------------------------------
   ------------------- UNITARIAS -----------------------
   ---------------------------------------------------- */

describe('PlayersComponent - Unitarias', () => {

  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayersComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PlayerService, useValue: playerServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    playerServiceMock.getPlayers.calls.reset();
  });

  // Test 1 -> El componente se crea
  it('El componente se crea', () => {
    expect(component).toBeTruthy();
  });

  // Test 2 -> Los jugadores cargan al iniciar
  it('Los jugadores cargan al iniciar', () => {

    const jugadoresMock = [
      { _id: '1', usuario: 'Prueba1', email: 'prueba1@test.com', deporte: 'Fútbol', equipo: 'Equipo1' },
      { _id: '2', usuario: 'Prueba2', email: 'prueba2@test.com', deporte: 'Baloncesto', equipo: 'Equipo2' }
    ];

    playerServiceMock.getPlayers.and.returnValue(of(jugadoresMock));

    component.ngOnInit();

    expect(component.jugadores.length).toBe(2);
    expect(component.jugadores[0]._id).toBe('1');
    expect(component.cargando).toBeFalse();
  });

  // Test 3 -> Los jugadores pueden filtrarse por nombre
  it('Los jugadores pueden filtrarse por nombre', () => {

    component.jugadores = [
      { _id: '1', usuario: 'Prueba1', email: 'prueba1@test.com', deporte: 'Fútbol', equipo: 'Equipo1' },
      { _id: '2', usuario: 'Prueba2', email: 'prueba2@test.com', deporte: 'Baloncesto', equipo: 'Equipo2' }
    ];

    component.buscador = 'prueba1';

    expect(component.jugadoresFiltrados.length).toBe(1);
    expect(component.jugadoresFiltrados[0].usuario).toBe('Prueba1');
  });

});



/* ----------------------------------------------------
   ----------------- DE INTEGRACIÓN --------------------
   ---------------------------------------------------- */

describe('PlayersComponent - Integración HTTP', () => {

  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayersComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [PlayerService]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Obtiene jugadores desde el servicio y los asigna al componente', () => {
    component.ngOnInit();
    const req = httpMock.expectOne(`${environment.apiUrl}/players`);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        _id: '1',
        usuario: 'Prueba',
        email: 'Prueba@test.com',
        deporte: 'Fútbol',
        equipo: 'A'
      }
    ]);

    expect(component.jugadores.length).toBe(1);
    expect(component.jugadores[0]._id).toBe('1');
    expect(component.cargando).toBeFalse();
  });
  afterEach(() => {
    httpMock.verify();
  });
});