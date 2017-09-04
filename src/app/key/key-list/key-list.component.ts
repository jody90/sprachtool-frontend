import { KeyService } from './../key.service';
import { LogSerivce } from './../../services/log.serivce';
import { KeyModel } from './../key.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-key-list',
    templateUrl: './key-list.component.html',
    styleUrls: ['./key-list.component.scss']
})
export class KeyListComponent implements OnInit {

    keys: KeyModel [];

    constructor(private logSerivce: LogSerivce, private keyService: KeyService) { }
    
    ngOnInit() {
        this.keys = this.keyService.getAllKeys();
    }

}
