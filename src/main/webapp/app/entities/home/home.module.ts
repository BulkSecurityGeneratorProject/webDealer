import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import {LightboxModule} from 'ngx-lightbox';
import {homePopupRoute} from './home.route';
import {carouselPopupRoute} from './carousel/carousel.route';
import {HomeDialogComponent, HomePopupComponent} from './home-dialog-component';
import {CarouselDialogComponent, CarouselPopupComponent} from './carousel/carousel-dialog.component';
import {CarouselService} from './carousel/carousel.service';
import {HomeService} from './';

const ENTITY_STATES = [
    homePopupRoute,
    carouselPopupRoute,
    HOME_ROUTE
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
    ],
    providers: [
        CarouselService,
        HomeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerHomeModule {}
