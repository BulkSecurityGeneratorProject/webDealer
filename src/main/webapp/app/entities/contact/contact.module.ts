import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../../shared';
import {
    ContactService,
    ContactPopupService,
    ContactComponent,
    ContactDetailComponent,
    ContactDialogComponent,
    ContactPopupComponent,
    ContactDeletePopupComponent,
    ContactDeleteDialogComponent,
    contactRoute,
    contactPopupRoute,
} from './';

import { AgmCoreModule } from '@agm/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

const ENTITY_STATES = [
    ...contactRoute,
    ...contactPopupRoute,
];

@NgModule({
    imports: [
        WebDealerSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAruHAyKEm0IAqW7WJVb9r9hEhZhqWm_N8'
        }),
        BrowserModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        ContactComponent,
        ContactDetailComponent,
        ContactDialogComponent,
        ContactDeleteDialogComponent,
        ContactPopupComponent,
        ContactDeletePopupComponent,
    ],
    entryComponents: [
        ContactComponent,
        ContactDialogComponent,
        ContactPopupComponent,
        ContactDeleteDialogComponent,
        ContactDeletePopupComponent,
    ],
    providers: [
        ContactService,
        ContactPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerContactModule {}
