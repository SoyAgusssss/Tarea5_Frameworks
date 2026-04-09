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

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe({
      next: (data: Player[]) => {
        this.jugadores = data
        .filter((j): j is Jugador => !!j._id)
        .map((j: Jugador) => ({
          ...j,
          modalId: `modalJugador_${j._id}`
        }));
      },
      error: () => alert('Error cargando jugadores')
    });
  }

  get jugadoresFiltrados() {
    const t = this.buscador.toLowerCase();
    return this.jugadores.filter(j =>
      j.usuario && j.usuario.toLowerCase().includes(t)
    );
  }
}




