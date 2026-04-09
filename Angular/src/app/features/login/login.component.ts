import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario = '';
  password = '';
  cargando = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    if (!form.valid) return alert('Completa todos los campos');
    this.cargando = true;

    this.authService.login(this.usuario, this.password)
      .subscribe({
        next: (res: any) => {
          this.cargando = false;
          if (!res.usuario) return alert('Usuario no encontrado');

          localStorage.setItem('usuarioActual', JSON.stringify(res.usuario));

          switch (res.usuario.rol) {
            case 'admin': this.router.navigate(['/home']); break;
            case 'capitan':
            case 'arbitro':
            case 'usuario':
            default: this.router.navigate(['/results']); break;
          }
        },
        error: (err: any) => {
          this.cargando = false;
          alert(err.error?.mensaje || 'Error login');
        }
      });
  }
}










