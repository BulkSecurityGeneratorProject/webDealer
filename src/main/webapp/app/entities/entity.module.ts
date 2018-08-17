import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebDealerContactModule } from './contact/contact.module';
import { WebDealerCarModule } from './car/car.module';
import {WebDealerHomeModule} from './home/home.module';
import { ProcedureComponent } from './procedure/procedure.component';
import {WebDealerProcedureModule} from './procedure/procedure.module';
import {SafeHtml} from '@angular/platform-browser';
import {SafeHtmlPipe} from '../pipes/safehtml.pipe';
import {CKEditorModule} from 'ng2-ckeditor';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        WebDealerContactModule,
        WebDealerCarModule,
        WebDealerHomeModule,
        WebDealerProcedureModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerEntityModule {}
