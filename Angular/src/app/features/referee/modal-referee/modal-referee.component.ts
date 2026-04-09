import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-referee',
  templateUrl: './modal-referee.component.html',
  styleUrls: ['./modal-referee.component.scss']
})
export class ModalRefereeComponent implements OnInit {

  @Input() arbitros: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

