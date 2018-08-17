import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../../shared';

import { AgmCoreModule } from '@agm/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcedureComponent} from './procedure.component';
import {procedurePopupRoute, procedureRoute} from './procedure.route';
import {ProcedureService} from './procedure.service';
import {SafeHtmlPipe} from '../../pipes/safehtml.pipe';
import {ProcedureDialogComponent, ProcedurePopupComponent} from './procedure-dialog.component';
import {SafeHtmlProcedurePipe} from '../../pipes/safehtmlprocedure.pipe';
import {ProcedurePopupService} from './procedure.popup.service';
import {CKEditorModule} from 'ng2-ckeditor';

const ENTITY_STATES = [
    procedureRoute,
    procedurePopupRoute
];

@NgModule({
    imports: [
        WebDealerSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BrowserModule,
        CommonModule,
        FormsModule,
        CKEditorModule
    ],
    declarations: [
    ProcedureComponent,
        ProcedurePopupComponent,
        SafeHtmlProcedurePipe,
        ProcedureDialogComponent
    ],
    entryComponents: [
        ProcedureComponent,
        ProcedurePopupComponent,
        ProcedureDialogComponent
    ],
    providers: [
        ProcedureService,
        ProcedurePopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerProcedureModule {}
