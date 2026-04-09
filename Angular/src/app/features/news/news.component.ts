import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements AfterViewInit {

  @ViewChild('noticiasCarousel', { static: false }) carousel!: ElementRef;
  @ViewChild('carruselContador', { static: false }) contador!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const carouselEl = this.carousel.nativeElement;
    const slides = carouselEl.querySelectorAll('.carousel-item');
    const contadorEl = this.contador.nativeElement;

    const updateCounter = (idx: number) => {
      contadorEl.textContent = `(Noticia ${idx + 1} de ${slides.length})`;
    };

    updateCounter(0);

    carouselEl.addEventListener('slid.bs.carousel', (event: any) => {
      updateCounter(event.to);
    });
  }
}

