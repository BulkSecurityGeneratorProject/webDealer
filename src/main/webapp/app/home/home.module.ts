import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from "ngx-bootstrap";

@NgModule({
    imports: [
        CarouselModule.forRoot(),
        NgbCarouselModule,
        WebDealerSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerHomeModule {}
