
import { HttpService } from '../services/http.service';
import { Translation } from './translation.model';
import { KeyModel } from './key.model';
import { LogSerivce } from './../services/log.serivce';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class KeyService {

    constructor(private logSerivce: LogSerivce, private httpService: HttpService) { }

    private keys: KeyModel[] = [];

    allKeysEmitter = new EventEmitter();
    keyEmitter = new EventEmitter();

    getAllKeys() {

        let tTranslations = [];
        var tKeys = [];

        this.httpService.getData("/v1/keys").subscribe(
            data => {
                for (let item of data) {
                    for (let i in item.translations) {
                        tTranslations.push(new Translation(item.translations[i].language, item.translations[i].value));
                    }
                    tKeys.push(new KeyModel(item.key, tTranslations, item.createdAt, item.modifiedAt));
                }
            },
            error => console.log(error)
        )
        this.allKeysEmitter.emit(tKeys);
    }

    getKeyById(id: string) {

        let currentTime: number = new Date().getTime();

        let key: KeyModel = new KeyModel("", [], currentTime , currentTime);
        let tTranslations = [];

        if (id == undefined) {
            this.keyEmitter.emit(key);
            return;
        }

        this.httpService.getData("/v1/key/" + id).subscribe(
            data => {
                for (let i in data[0].translations) {
                    tTranslations.push(new Translation(data[0].translations[i].language, data[0].translations[i].value));
                }
                key = new KeyModel(data[0].key, tTranslations, data[0].createdAt, data[0].modifiedAt);
                this.keyEmitter.emit(key);
            },
            error => {
                throw new Error("No key for ID: " + id + " found");
            }
        )
    }

    addKey(key: KeyModel) {

        key.key = key.key.toLowerCase();

        this.keys.push(key);

        this.httpService.postData('/v1/key/' + key.key, key).subscribe(
            data => console.log(data),
            error => console.log(error),
        );
    }

    updateKey(keyId: string, key: KeyModel) {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i].key == keyId) {
                this.keys[i] = key;
                break;
                // TODO Call Backend
            }
        }
    }

    deleteKey(keyId: string) {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i].key == keyId) {
                this.keys.splice(i, 1);
                break;
                // TODO Call Backend
            }
        }
    }

}