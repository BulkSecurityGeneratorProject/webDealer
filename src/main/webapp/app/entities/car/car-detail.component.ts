// TODO dodac do niego lightscribe.

import {Component, OnInit, OnDestroy, Renderer2, Inject, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiDataUtils} from 'ng-jhipster';

import {Car} from './car.model';
import {CarService} from './car.service';
import {Lightbox, LightboxModule} from 'ngx-lightbox';
import * as $ from 'jquery';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'jhi-car-detail',
    templateUrl: './car-detail.component.html',
    styleUrls: ['car-detail.scss']
})
export class CarDetailComponent implements OnInit, OnDestroy {
    car: Car;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private gear: string;
    private album: any;
    private imgLoaded: boolean;

    constructor(private eventManager: JhiEventManager,
                private dataUtils: JhiDataUtils,
                private carService: CarService,
                private route: ActivatedRoute,
                private router: Router,
                private _renderer2: Renderer2,
                @Inject(DOCUMENT) private _document) {
        this.imgLoaded = false;
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCars();

    }


    invokeGallery() {
        const script = this._renderer2.createElement('script');
        script.type = `text/javascript`;
        script.text = `
        {
            $(document).ready(function () {
                setTimeout(function(){
                     $('#imageGallery').lightSlider({
                        gallery: true,
                        item: 1,
                        slideMargin: 0,
                        loop: true,
                        thumbitem: 5,
                        enableDrag: false,
                        currentPagerPosition:'left',
                        onSliderLoad: function(el){
                            el.lightGallery({
                            selector: '#imageGallery .lslide',
                            thumbnail: true,
                            showThumbByDefault: true
                            });
                        } 
                      });
                },500);
            });
        }
    `;
        this._renderer2.appendChild(this._document.body, script);
        setTimeout(() => this.imgLoaded = true, 250);
    }

    load(id) {
        this.carService.find(id).subscribe((car) => {
            this.car = car;
            this.gear = String(this.car.gear);
            this.invokeGallery();
            this.car.images = this.setMainImage(this.car.images);
        }, (res) => {
            if (this.route.snapshot.url[0].path === 'car-shipping') {
                this.router.navigateByUrl('/car-shipping');
            } else if (this.route.snapshot.url[0].path === 'car') {
                this.router.navigateByUrl('/car');
            }
        });
    }


    setMainImage(images: any): any {
        if (images && images.length > 1) {
            for (let i = 0; i < images.length; i++) {
                if (images[i].isMain) {
                    const temp = images[i];
                    images[i] = images[0];
                    images[0] = temp;
                }
            }
            return images;
        }
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carListModification',
            (response) => this.load(this.car.id)
        );
    }
}
