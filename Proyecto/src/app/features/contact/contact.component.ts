import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('contactoForm') contactoForm: any;
  @ViewChild('toastContacto') toastContacto!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    const toast = new bootstrap.Toast(this.toastContacto.nativeElement);
    toast.show();

    this.contactoForm.reset();
  }
}

