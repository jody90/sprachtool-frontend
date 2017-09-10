import { Subscription } from 'rxjs/Rx';
import { KeyService } from './../key.service';
import { LogSerivce } from './../../services/log.serivce';
import { KeyModel } from './../key.model';
import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-key-list',
    templateUrl: './key-list.component.html',
    styleUrls: ['./key-list.component.scss']
})
export class KeyListComponent implements OnInit, OnDestroy {

    keys: KeyModel [];
    keysSubscription: Subscription;


    constructor(private logSerivce: LogSerivce, private keyService: KeyService) { }
    
    ngOnInit() {
        
        this.keysSubscription = this.keyService.allKeysEmitter.subscribe(
            (data: KeyModel []) => {
                this.keys = data
            }
        )
        
        this.keyService.getAllKeys();
    }

    ngOnDestroy() {
        this.keysSubscription.unsubscribe();
    }

}
