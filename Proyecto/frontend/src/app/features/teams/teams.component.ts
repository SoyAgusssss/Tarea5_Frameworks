import { Component, OnInit } from '@angular/core';
import { TeamService, Team } from '../../core/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  nuevoEquipo: Team = { nombre: '', deporte: '' };
  equipos: Team[] = [];
  equiposFiltrados: Team[] = [];
  cargando = true;

  filtroCompeticion = 'todos';
  textoBusqueda = '';

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.teamService.getTeams().subscribe({
      next: data => {
        this.equipos = data;
        this.cargando = false;
        this.aplicarFiltros();
      },
      error: () => {
        this.cargando = false;
        alert('Error cargando equipos');
      }
    });
  }

  crearEquipo() {
    if (!this.nuevoEquipo.nombre || !this.nuevoEquipo.deporte) {
      return alert('Completa todos los campos');
    }

    this.teamService.createTeam(this.nuevoEquipo).subscribe({
      next: () => {
        alert('Equipo creado');
        this.cargarEquipos();
        this.nuevoEquipo = { nombre: '', deporte: '' };
      },
      error: () => alert('Error creando equipo')
    });
  }

  aplicarFiltros() {
    this.equiposFiltrados = this.equipos.filter(eq => {
      const coincideCompeticion =
        this.filtroCompeticion === 'todos' ||
        eq.deporte.toLowerCase() === this.filtroCompeticion;

      const coincideTexto =
        eq.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());

      return coincideCompeticion && coincideTexto;
    });
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  onBusquedaChange() {
    this.aplicarFiltros();
  }
}


