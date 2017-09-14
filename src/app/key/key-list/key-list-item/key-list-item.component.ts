import { KeyModel } from './../../key.model';
import { Component, Input, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

@Component({
    selector: 'app-key-list-item',
    templateUrl: './key-list-item.component.html',
    styleUrls: ['./key-list-item.component.scss']
})
export class KeyListItemComponent implements OnInit {

    @Input() key: KeyModel;

    p: number = 1;

    ngOnInit() {
    }

}
