// TODO dodac do niego lightscribe.

import {Component, OnInit, OnDestroy, Renderer2, Inject, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiDataUtils} from 'ng-jhipster';

import {Car} from './car.model';
import {CarService} from './car.service';
import {Lightbox, LightboxModule} from 'ngx-lightbox';

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

    constructor(private eventManager: JhiEventManager,
                private dataUtils: JhiDataUtils,
                private carService: CarService,
                private route: ActivatedRoute,
                private router: Router,
                private lightbox: Lightbox) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCars();

    }

    load(id) {
        this.carService.find(id).subscribe((car) => {
            this.car = car;
            this.gear = String(this.car.gear);
            this.album = {
                src: 'data:' + car.imgContentType + ';base64,' + car.img
            }
        }, (res) => {
            if (this.route.snapshot.url[0].path === 'car-shipping') {
                this.router.navigateByUrl('/car-shipping');
            } else if (this.route.snapshot.url[0].path === 'car') {
                this.router.navigateByUrl('/car');
            }
        });
    }

    open() {
        const albums = [];
        albums.push(this.album);
        this.lightbox.open(albums, 0);
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
