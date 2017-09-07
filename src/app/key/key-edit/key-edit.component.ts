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
        private router: Router
    ) { }
    
    @ViewChild('form') form;

    keyModel: KeyModel;
    possibleLanguages: string[];
    language: string = '';
    subscription: Subscription;
    formSubscription: Subscription;
    currentKeyId: string;
    render: boolean = false;
    saved: boolean = false;
    formDirty: boolean;

    ngAfterViewInit() {
        if (this.form != undefined) {
            this.formSubscription = this.form.control.valueChanges.subscribe(values => this.formValueChanges(values));
        }
    }

    formValueChanges(values) {
        this.formDirty = this.form.dirty;
    }

    ngOnInit() {

        this.subscription = this.activatedRoute.params.subscribe(
            params => {
                try {
                    this.keyModel = this.keyService.getKeyById(params["id"]);
                    this.possibleLanguages = this.translateLanguageService.getLanguagesForKey(this.keyModel);
                    this.currentKeyId = params["id"];
                    this.render = true;
                }
                catch (error) {
                    this.logSerivce.log(error);
                    this.router.navigate(['translations']);
                }
            }
        );

    }

    canDeactivate() {
        if (!this.saved && this.formDirty) {
            return confirm("Deine Änderungen sind noch nicht gespeichert!");
        }
        else {
            return true;
        }
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
        this.keyModel.translations.push(new Translation(language, ""));
        this.possibleLanguages.splice(this.possibleLanguages.indexOf(language), 1);
    }

    saveKey(form: NgForm) {
        this.keyModel.modifiedAt = new Date().getTime();

        if (this.currentKeyId == undefined) {
            this.keyService.addKey(this.keyModel);
            this.router.navigate(['translations', 'edit', this.keyModel.key]);
        }
        else {
            this.keyService.updateKey(this.currentKeyId, this.keyModel);
        }

        this.saved = true;

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.formSubscription != undefined) {
            this.formSubscription.unsubscribe();
        }
    }

}
