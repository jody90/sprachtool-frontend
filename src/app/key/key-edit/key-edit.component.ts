import { TranslateLanguageService } from './../../services/translate-language.service';
import { KeyModel } from './../key.model';
import { KeyService } from './../key.service';
import { LogSerivce } from '../../services/log.serivce';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-key-edit',
    templateUrl: './key-edit.component.html',
    styleUrls: ['./key-edit.component.scss']
})
export class KeyEditComponent implements OnInit {

    constructor(private logSerivce: LogSerivce, private keyService: KeyService, private translateLanguageService: TranslateLanguageService) { }

    key: KeyModel;
    possibleLanguages: string [];
    

    ngOnInit() {
        this.key = this.keyService.getKeyById("jody.hey");
        this.possibleLanguages = this.translateLanguageService.getLanguagesForKey(this.key);
        this.logSerivce.log(this.key);
    }

    addLanguage() {
        
        
        this.logSerivce.log("Add Language clicked!");
    }

}
