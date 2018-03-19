import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../../shared';
import {
    CarService,
    CarPopupService,
    CarComponent,
    CarDetailComponent,
    CarDialogComponent,
    CarPopupComponent,
    CarDeletePopupComponent,
    CarDeleteDialogComponent,
    carRoute,
    carPopupRoute,
    CarResolvePagingParams,
} from './';
import {ShippedPipe} from '../../pipes/shipped.pipe';

const ENTITY_STATES = [
    ...carRoute,
    ...carPopupRoute,
];

@NgModule({
    imports: [
        WebDealerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarComponent,
        CarDetailComponent,
        CarDialogComponent,
        CarDeleteDialogComponent,
        CarPopupComponent,
        CarDeletePopupComponent,
        ShippedPipe,
    ],
    entryComponents: [
        CarComponent,
        CarDialogComponent,
        CarPopupComponent,
        CarDeleteDialogComponent,
        CarDeletePopupComponent,
    ],
    providers: [
        CarService,
        CarPopupService,
        CarResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerCarModule {}
