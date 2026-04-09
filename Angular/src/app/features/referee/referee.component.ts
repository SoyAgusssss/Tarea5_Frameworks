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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getPorRol('arbitro').subscribe({
      next: (data: any[]) => {
        this.arbitros = data.map(a => ({
          ...a,
          modalId: `modalArbitro_${a._id}`
        }));
      },
      error: () => alert('Error cargando árbitros')
    });
  }

  get arbitrosFiltrados() {
    const t = this.buscador.toLowerCase();
    return this.arbitros.filter(a =>
      a.usuario && a.usuario.toLowerCase().includes(t)
    );
  }
}



