import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'jhi-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['carousel.scss']
})
export class CarouselComponent implements OnInit {
  constructor() { }
    toggleCaption() {
      if (window.innerWidth > 992) {
          const carouselContainer = $('.carousel');
          $('.carousel-caption').hide();
          const caption = carouselContainer.find('.active').find('.carousel-caption');
          caption.delay(500).fadeIn(1000);
      }
    }

    carouselInit() {
        this.toggleCaption();
        $('#carousel').carousel({
            interval: 4000
        }).on('slid.bs.carousel', () => {
            this.toggleCaption();
        });
    }
  ngOnInit() {
      this.carouselInit();
  }

}
