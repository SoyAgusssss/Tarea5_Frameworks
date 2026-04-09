import { Component, OnInit } from '@angular/core';
import { MatchesService, Match } from '../../core/match.service';

interface UsuarioActual {
  usuario: string;
  rol: 'admin' | 'capitan' | 'arbitro' | 'usuario';
  equipo?: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  partidos: Match[] = [];
  usuarioActual: UsuarioActual | null = null;

  // Para crear partido
  nuevoPartido: Partial<Match> = {
    deporte: '',
    equipo1: '',
    equipo2: '',
    fecha: '',
    arbitro: '',
    estado: 'pendiente'
  };

  // Para editar partido (admin)
  partidoEditando: Match | null = null;

  deportesDisponibles: string[] = ['Fútbol', 'Baloncesto', 'Voleibol', 'Tenis'];

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('usuarioActual');
    if (user) this.usuarioActual = JSON.parse(user);
    this.cargarPartidos();
  }

  cargarPartidos() {
    this.matchesService.getMatches().subscribe({
      next: (res: Match[]) => {
        if (!this.usuarioActual) return;
        const rol = this.usuarioActual.rol;
        this.partidos = res.filter(match => {
          switch (rol) {
            case 'admin': return true;
            case 'capitan':
            case 'usuario': return match.equipo1 === this.usuarioActual?.equipo || match.equipo2 === this.usuarioActual?.equipo;
            case 'arbitro': return match.arbitro === this.usuarioActual?.usuario;
            default: return false;
          }
        });
      },
      error: (err) => console.error('Error cargando partidos:', err)
    });
  }

  // Crear partido (admin)
  crearPartido() {
    if (!this.nuevoPartido.deporte || !this.nuevoPartido.equipo1 || !this.nuevoPartido.equipo2 || !this.nuevoPartido.fecha || !this.nuevoPartido.arbitro) {
      alert('Completa todos los campos');
      return;
    }

    this.matchesService.createMatch(this.nuevoPartido as Match).subscribe({
      next: () => {
        alert('Partido creado');
        this.nuevoPartido = { deporte: '', equipo1: '', equipo2: '', fecha: '', arbitro: '', estado: 'pendiente' };
        this.cargarPartidos();
      },
      error: (err) => console.error('Error creando partido:', err)
    });
  }

  // Preparar edición (admin)
  editarPartido(match: Match) {
    this.partidoEditando = { ...match }; // clonamos para editar
  }

  // Guardar edición (admin)
  guardarEdicion() {
    if (!this.partidoEditando || !this.partidoEditando._id) return;

    this.matchesService.updateMatch(this.partidoEditando._id, this.partidoEditando).subscribe({
      next: () => {
        alert('Partido actualizado');
        this.partidoEditando = null;
        this.cargarPartidos();
      },
      error: (err) => console.error('Error actualizando partido:', err)
    });
  }

  // Cancelar edición
  cancelarEdicion() {
    this.partidoEditando = null;
  }

  // Actualizar resultado rápido (capitan o admin)
  actualizarResultado(match: Match, goles1: number, goles2: number) {
    if (!match._id) return;
    this.matchesService.updateMatch(match._id, { goles1, goles2 }).subscribe({
      next: () => this.cargarPartidos(),
      error: (err) => console.error(err)
    });
  }

  // Agrupar partidos por deporte
  get deDeporte(): { [key: string]: Match[] } {
    const grouped: { [key: string]: Match[] } = {};
    this.partidos.forEach(match => {
      if (!grouped[match.deporte]) grouped[match.deporte] = [];
      grouped[match.deporte].push(match);
    });
    return grouped;
  }
}









