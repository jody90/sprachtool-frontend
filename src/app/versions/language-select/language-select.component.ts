import { Subscription } from 'rxjs/Rx';
import { TranslateLanguageService } from './../../services/translate-language.service';
// import { TranslateLanguageService } from '../../services/translate-language.service';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { KeyModel } from '../../key/key.model';

@Component({
    selector: 'app-language-select',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit, OnDestroy {

    constructor(private translateLanguageService: TranslateLanguageService) { }

    @Input() keys: KeyModel[];
    @ViewChild("language") language;

    
    languages: string [] = [];
    
    allLanguagesSubscription: Subscription;
    
    ngOnInit() {

        this.translateLanguageService.getAllLanguages();

        this.allLanguagesSubscription = this.translateLanguageService.allLanguagesEmitter.subscribe(
            data => this.languages = data
        )

        // for (let i in this.keys) {
        //     let translations = this.keys[i].translations;
        //     for (let k in translations) {
        //         if (this.languages.indexOf(translations[k].language) == -1) {
        //             this.languages.push(translations[k].language);
        //         }
        //     }
        // }
        
        this.language = this.languages.toString();
    }

    languageSelect(selectedLanguage: string) {
        this.language = selectedLanguage;
    }

    ngOnDestroy() {
        this.allLanguagesSubscription.unsubscribe();
    }

}
