import {Component, OnInit} from '@angular/core';
import {Home} from '../home';
import {Principal, ResponseWrapper} from '../../shared';
import {Procedure} from './procedure.model';
import {ProcedureService} from './procedure.service';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-procedure',
    templateUrl: './procedure.component.html',
    styleUrls: ['procedure.scss']
})
export class ProcedureComponent implements OnInit {

    procedure: Procedure;
    eventSubscriber: Subscription;
    currentAccount: any;

    constructor(private procedureService: ProcedureService,
                private eventManager: JhiEventManager,
                private principal: Principal) {
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInProcedure();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    loadAll() {
        this.procedureService.get().subscribe(
            (res: Procedure) => {
                this.procedure = res;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    private onError(err: any) {
        console.log(err);
    }

    registerChangeInProcedure() {
        this.eventSubscriber = this.eventManager.subscribe('procedureModification', (response) => this.loadAll());
    }

}
