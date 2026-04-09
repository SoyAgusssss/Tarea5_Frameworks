import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {

  @ViewChild('modalInscripcion', { static: false }) modalInscripcion?: ElementRef;
  @ViewChild('formInscripcion', { static: false }) formInscripcion?: ElementRef;

  modalInstance: any;

  ngAfterViewInit(): void {

    if (!this.modalInscripcion || !this.formInscripcion) {
      return;
    }

    // Crear instancia del modal de Bootstrap
    this.modalInstance = new bootstrap.Modal(this.modalInscripcion.nativeElement);

    // Cuando se abre el modal → enfocar primer input
    this.modalInscripcion.nativeElement.addEventListener('shown.bs.modal', () => {
      const primerInput =
        this.modalInscripcion?.nativeElement.querySelector('input,select,textarea');
      if (primerInput) primerInput.focus();
    });

    // Cuando se cierra el modal → reset del formulario
    this.modalInscripcion.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.formInscripcion?.nativeElement.reset();
    });
  }

  enviarInscripcion() {
    if (!this.modalInstance) return;

    // Cerrar modal
    this.modalInstance.hide();

    // Mostrar toast después de un pequeño retraso
    setTimeout(() => {
      const toastElement = document.getElementById('toastInscripcion');
      if (toastElement) {
        bootstrap.Toast.getOrCreateInstance(toastElement).show();
      }
    }, 300);

    // Reset por si acaso
    this.formInscripcion?.nativeElement.reset();
  }
}


