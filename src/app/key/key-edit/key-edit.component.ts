import { Subscription } from 'rxjs/Rx';
import { LogSerivce } from './../../services/log.serivce';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives';
import { Translation } from './../translation.model';
import { TranslateLanguageService } from './../../services/translate-language.service';
import { KeyModel } from './../key.model';
import { KeyService } from './../key.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ComponentCanDeactivate } from '../key-edit.guard';

@Component({
    selector: 'app-key-edit',
    templateUrl: './key-edit.component.html',
    styleUrls: ['./key-edit.component.scss']
})
export class KeyEditComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

    constructor(
        private logSerivce: LogSerivce,
        private keyService: KeyService,
        private translateLanguageService: TranslateLanguageService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    @ViewChild('form') form;

    keyModel: KeyModel;
    possibleLanguages: string[] = [];
    language: string = '';
    saved: boolean = false;
    formDirty: boolean;
    currentKeyId: string;
    subscription: Subscription;
    formSubscription: Subscription;
    keySubscription: Subscription;
    languagesSubscription: Subscription;

    ngAfterViewInit() {
        if (this.form != undefined) {
            this.formSubscription = this.form.control.valueChanges.subscribe(values => this.formValueChanges(values));
        }
    }

    formValueChanges(values) {
        this.formDirty = this.form.dirty;
    }

    ngOnInit() {

        this.keySubscription = this.keyService.keyEmitter.subscribe(
            (data: KeyModel) => {
                this.keyModel = data
                this.translateLanguageService.getAllLanguages();
                this.languagesSubscription = this.translateLanguageService.allLanguagesEmitter.subscribe(
                    languages => this.possibleLanguages = this.translateLanguageService.getLanguagesForKey(data, languages),
                    error => console.log(error)
                )

            }
        )

        this.subscription = this.activatedRoute.params.subscribe(
            params => {
                try {
                    this.keyService.getKeyById(params["id"]);
                    this.currentKeyId = params["id"];
                }
                catch (error) {
                    // this.logSerivce.log(error);
                    this.router.navigate(['translations']);
                }
            }
        );
    }

    removeLanguage(language: string) {
        for (let i = 0; i < this.keyModel.translations.length; i++) {
            if (this.keyModel.translations[i].language == language) {
                this.keyModel.translations.splice(i, 1);
                break;
            }
        }
        this.possibleLanguages.push(language);
    }

    addLanguage(language: string) {
        this.keyModel.translations.push(new Translation(language, "", new Date().getTime()));
        this.possibleLanguages.splice(this.possibleLanguages.indexOf(language), 1);
    }

    saveKey(form: NgForm) {
        this.keyModel.modifiedAt = new Date().getTime();

        if (this.currentKeyId == undefined) {
            this.keyService.addKey(this.keyModel);
        }
        else {
            this.keyService.updateKey(this.currentKeyId, this.keyModel);
        }

        this.saved = true;
        // this.keyService.getAllKeys();
        this.router.navigate(['translations', 'edit', this.keyModel.key]);
    }

    translationChanged(translationIndex: number) {
        this.keyModel.translations[translationIndex].modifiedAt = new Date().getTime();
    }

    needTranslationUpdate(language: string) {

        let translations = this.keyModel.translations;
        
        var tempLanguages = {}
        for (let i in translations) {
            tempLanguages[translations[i].language] = translations[i].modifiedAt;
        }

        if (tempLanguages["de"] !== undefined) {
            if (tempLanguages["de"] > tempLanguages[language]) {
                return true
            }
        }

        return false;
    }

    checkTranslation(language: string) {
        for (let i in this.keyModel.translations) {
            if (this.keyModel.translations[i].language == language) {
                this.keyModel.translations[i].modifiedAt = new Date().getTime();
                this.keyService.updateKey(this.keyModel.key, this.keyModel);
                break;
            }
        }
    }

    canDeactivate() {
        if (!this.saved && this.formDirty) {
            return confirm("Deine Änderungen sind noch nicht gespeichert!");
        }
        else {
            return true;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.keySubscription.unsubscribe();
        this.formSubscription.unsubscribe();
        this.languagesSubscription.unsubscribe();
    }

}
