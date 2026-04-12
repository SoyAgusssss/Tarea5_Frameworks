import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.scss']
})
export class RefereeComponent implements OnInit {

  buscador = '';
  arbitros: any[] = [];
  arbitroSeleccionado: any | null = null;
  cargando = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getPorRol('arbitro').subscribe({
      next: (data: any[]) => {
        this.arbitros = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error cargando árbitros');
      }
    });
  }

  seleccionarArbitro(arbitro: any) {
    this.arbitroSeleccionado = arbitro;
  }

  trackByArbitroId(_: number, arbitro: any): string {
    return arbitro._id;
  }

  get arbitrosFiltrados() {
    const t = this.buscador.toLowerCase();
    return this.arbitros.filter(a =>
      a.usuario && a.usuario.toLowerCase().includes(t)
    );
  }
}



