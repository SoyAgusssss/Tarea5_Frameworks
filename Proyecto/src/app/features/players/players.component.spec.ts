import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersComponent } from './players.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayerService } from '../../core/player.service';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

const playerServiceMock = {
  getPlayers: jasmine.createSpy('getPlayers')
};

const jExpect = <T>(actual: T) => expect(actual) as unknown as jasmine.Matchers<T>;



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
      providers: [
        { provide: PlayerService, useValue: playerServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
  });

  // Test 1 -> El componente se crea
  it('El componente se crea', () => {
    jExpect(component).toBeTruthy();
  });

  // Test 2 -> Los jugadores cargan al iniciar
  it('Los jugadores cargan al iniciar', () => {

    const jugadoresMock = [
      { _id: '1', usuario: 'Prueba1', email: 'prueba1@test.com', deporte: 'Fútbol', equipo: 'Equipo1' },
      { _id: '2', usuario: 'Prueba2', email: 'prueba2@test.com', deporte: 'Baloncesto', equipo: 'Equipo2' }
    ];

    playerServiceMock.getPlayers.and.returnValue(of(jugadoresMock));

    component.ngOnInit();

    jExpect(component.jugadores.length).toBe(2);
    jExpect(component.jugadores[0].modalId).toBe('modalJugador_1');
  });

  // Test 3 -> Los jugadores pueden filtrarse por nombre
  it('Los jugadores pueden filtrarse por nombre', () => {

    component.jugadores = [
      { _id: '1', usuario: 'Prueba1', email: 'prueba1@test.com', deporte: 'Fútbol', equipo: 'Equipo1' },
      { _id: '2', usuario: 'Prueba2', email: 'prueba2@test.com', deporte: 'Baloncesto', equipo: 'Equipo2' }
    ];

    component.buscador = 'prueba1';

    jExpect(component.jugadoresFiltrados.length).toBe(1);
    jExpect(component.jugadoresFiltrados[0].usuario).toBe('Prueba1');
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
      providers: [PlayerService]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Obtiene jugadores desde el servicio y los asigna al componente', () => {
    component.ngOnInit();
    const req = httpMock.expectOne(`${environment.apiUrl}/players`);
    jExpect(req.request.method).toBe('GET');
    req.flush([
      {
        _id: '1',
        usuario: 'Prueba',
        email: 'Prueba@test.com',
        deporte: 'Fútbol',
        equipo: 'A'
      }
    ]);
  });
    afterEach(() => {
    httpMock.verify();
  });
});