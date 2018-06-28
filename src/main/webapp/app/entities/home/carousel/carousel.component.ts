import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ResponseWrapper} from '../../../shared';
import {Carousel, CarouselService} from './';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

@Component({
  selector: 'jhi-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['carousel.scss']
})
export class CarouselComponent implements OnInit {
    eventSubscriber: Subscription;
    carousel1: Carousel;
    carousel2: Carousel;
    carousel3: Carousel;
  constructor(private carouselService: CarouselService,
              private eventManager: JhiEventManager) { }
  ngOnInit() {
      this.carouselInit();
      this.loadAll();
      this.registerChangeInCarousel();
  }
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
    loadAll() {
        this.carouselService.query().subscribe(
            (res: ResponseWrapper) => {
                if (res.json.length === 3) {
                this.carousel1 = res.json[0];
                this.carousel2 = res.json[1];
                this.carousel3 = res.json[2];
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    registerChangeInCarousel() {
        this.eventSubscriber = this.eventManager.subscribe('carouselModification', (response) => this.loadAll());
    }

    private onError(err: any) {
        console.log(err);
    }

}
