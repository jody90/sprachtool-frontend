import { TranslateLanguageService } from './../../services/translate-language.service';
import { Subscription } from 'rxjs/Rx';
import { KeyService } from './../key.service';
import { LogSerivce } from './../../services/log.serivce';
import { KeyModel } from './../key.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-key-list',
    templateUrl: './key-list.component.html',
    styleUrls: ['./key-list.component.scss']
})
export class KeyListComponent implements OnInit, OnDestroy {

    keys: KeyModel [];
    keysSubscription: Subscription;
    languages;
    selectedLanguage: string;


    constructor(private logSerivce: LogSerivce, private keyService: KeyService, private translateLanguageService: TranslateLanguageService) { }
    
    ngOnInit() {
        
        this.keysSubscription = this.keyService.allKeysEmitter.subscribe(
            (data: KeyModel []) => {
                this.keys = data;
            }
        )
        this.languages = this.translateLanguageService.getAllLanguages();
        this.keyService.getAllKeys();
    }

    filterLanguage(lang: string) {
        this.selectedLanguage = lang;
    }

    ngOnDestroy() {
        this.keysSubscription.unsubscribe();
    }

}
