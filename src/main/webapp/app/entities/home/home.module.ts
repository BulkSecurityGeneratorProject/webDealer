import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import {LightboxModule} from 'ngx-lightbox';
import {carouselPopupRoute} from './carousel/carousel.route';
import {HomeDialogComponent, HomePopupComponent} from './home-dialog-component';
import {CarouselDialogComponent, CarouselPopupComponent} from './carousel/carousel-dialog.component';
import {CarouselService} from './carousel/carousel.service';
import {HomeService} from './';
import {HomePopupService} from './home-popup.service';
import {CarouselPopupService} from './carousel/carousel-popup.service';

const ENTITY_STATES = [
    ...HOME_ROUTE,
    carouselPopupRoute
];

@NgModule({
    imports: [
        CarouselModule,
        NgbCarouselModule,
        WebDealerSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        LightboxModule
    ],
    declarations: [
        HomeComponent,
        CarouselComponent,
        HomePopupComponent,
        HomeDialogComponent,
        CarouselPopupComponent,
        CarouselDialogComponent
    ],
    entryComponents: [
        HomeComponent,
        CarouselComponent,
        HomePopupComponent,
        HomeDialogComponent,
        CarouselPopupComponent,
        CarouselDialogComponent
    ],
    providers: [
        CarouselService,
        HomeService,
        HomePopupService,
        CarouselPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerHomeModule {}
