import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { KeyModel } from '../../key/key.model';

@Component({
    selector: 'app-language-select',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

    constructor() { }

    @Input() keys: KeyModel[];
    @ViewChild("language") language;

    
    languages: string [] = [];
    
    ngOnInit() {
        for (let i in this.keys) {
            let translations = this.keys[i].translations;
            for (let k in translations) {
                if (this.languages.indexOf(translations[k].language) == -1) {
                    this.languages.push(translations[k].language);
                }
            }
        }
        this.language = this.languages.toString();
    }

    languageSelect(selectedLanguage: string) {
        this.language = selectedLanguage;
    }

}
