import {NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import { RouterModule } from '@angular/router';

import { LightboxModule } from 'ngx-lightbox';

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
import {CarEntryComponent} from './carEntry/car-entry.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {SafeHtmlPipe} from '../../pipes/safehtml.pipe';
import { NgwWowModule } from 'ngx-wow';
import {DDwebDataUtils} from './data-util.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
const ENTITY_STATES = [
    ...carRoute,
    ...carPopupRoute,
];

@NgModule({
    imports: [
        WebDealerSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        LightboxModule,
        CKEditorModule,
        NgwWowModule,
    ],
    declarations: [
        CarComponent,
        CarDetailComponent,
        CarDialogComponent,
        CarDeleteDialogComponent,
        CarPopupComponent,
        CarDeletePopupComponent,
        CarEntryComponent,
        ShippedPipe,
        SafeHtmlPipe
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
        DDwebDataUtils,
        {
          provide: LOCALE_ID, useValue: 'en_US'
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerCarModule {}
