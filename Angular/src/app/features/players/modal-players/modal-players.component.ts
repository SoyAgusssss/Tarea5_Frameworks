import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-players',
  templateUrl: './modal-players.component.html',
  styleUrls: ['./modal-players.component.scss']
})
export class ModalPlayersComponent {

  @Input() jugadores: any[] = [];

}


