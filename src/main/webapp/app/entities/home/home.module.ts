import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../../shared';

import {HomeComponent, homePopupRoute, homeRoute} from './';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-bootstrap';
import {LightboxModule} from 'ngx-lightbox';

import {
    CarouselComponent,
    carouselPopupRoute,
    CarouselDialogComponent,
    CarouselPopupComponent,
    CarouselService,
    CarouselPopupService
} from './carousel';

import {
    HomeDialogComponent,
    HomePopupComponent,
    HomeService,
    HomePopupService
} from './';

const ENTITY_STATES = [
    ...homeRoute,
    ...homePopupRoute,
    ...carouselPopupRoute
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
        HomePopupComponent,
        HomeDialogComponent,
        CarouselComponent,
        CarouselPopupComponent,
        CarouselDialogComponent
    ],
    entryComponents: [
        HomeComponent,
        HomePopupComponent,
        HomeDialogComponent,
        CarouselComponent,
        CarouselPopupComponent,
        CarouselDialogComponent
    ],
    providers: [
        HomeService,
        HomePopupService,
        CarouselService,
        CarouselPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerHomeModule {}
