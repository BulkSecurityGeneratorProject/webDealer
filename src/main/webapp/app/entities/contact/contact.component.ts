import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Contact} from './contact.model';
import {ContactService} from './contact.service';
import {Principal, ResponseWrapper} from '../../shared';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';

@Component({
    selector: 'jhi-contact',
    templateUrl: './contact.component.html',
    styleUrls: [
        'contact.scss'
    ]
})

// TODO odswiezanie mapy
export class ContactComponent implements OnInit, OnDestroy {
    contact: Contact;
    currentAccount: any;
    eventSubscriber: Subscription;
    lat: number;
    lng: number;

    @ViewChild('agm')
    agmElementRef: ElementRef;

    constructor(private contactService: ContactService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal,
                private mapsAPILoader: MapsAPILoader) {
    }

    loadAll() {
        this.contactService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contact = res.json[0];
                this.loadMap();
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContact();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Contact) {
        return item.id;
    }

    registerChangeInContact() {
        this.eventSubscriber = this.eventManager.subscribe('contactModification', (response) => this.loadAll());
    }

    private onError(error) {
        if (error) {
            this.jhiAlertService.error(error.message, null, null);
        }
    }

    private loadMap() {
        this.mapsAPILoader.load().then(() => {
            new google.maps.Geocoder().geocode({'address': this.contact.city + ' ' + this.contact.address}, (results, status) => {
                if (status.toString() === 'OK') {
                    const loc = results[0].geometry.location;
                    this.lat = loc.lat();
                    this.lng = loc.lng();
                } else {
                    console.log('error during geocoding');
                }
            });
        });
    }
}
