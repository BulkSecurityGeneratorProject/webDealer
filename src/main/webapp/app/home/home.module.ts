import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-bootstrap';
import { CarouselComponent } from './carousel';
import {LightboxModule} from 'ngx-lightbox';
import {CarouselService, HomeService} from '../entities/home';

@NgModule({
    imports: [
        CarouselModule,
        NgbCarouselModule,
        WebDealerSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        LightboxModule
    ],
    declarations: [
        HomeComponent,
        CarouselComponent,
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
