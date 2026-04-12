import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../../core/player.service';

interface Jugador extends Player {
  _id: string;
  modalId?: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  buscador = '';
  jugadores: Jugador[] = [];
  jugadorSeleccionado: Jugador | null = null;
  cargando = true;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe({
      next: (data: Player[]) => {
        this.jugadores = data.filter((j): j is Jugador => !!j._id);
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error cargando jugadores');
      }
    });
  }

  seleccionarJugador(jugador: Jugador) {
    this.jugadorSeleccionado = jugador;
  }

  trackByJugadorId(_: number, jugador: Jugador): string {
    return jugador._id;
  }

  get jugadoresFiltrados() {
    const t = this.buscador.toLowerCase();
    return this.jugadores.filter(j =>
      j.usuario && j.usuario.toLowerCase().includes(t)
    );
  }
}




