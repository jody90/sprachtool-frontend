
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
        this.keys = tKeys;
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

        // workaround add query parameter to avoid stalling in chrome
        this.httpService.getData("/v1/key/" + id + "?no-cache=" + new Date().getTime()).subscribe(
            
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

        this.httpService.postData('/v1/key/' + key.key, key).subscribe(
            data =>  {
                this.getAllKeys();
            },
            error => console.log(error),
        );
    }

    updateKey(keyId: string, key: KeyModel) {

        this.httpService.putData('/v1/key/' + keyId, key).subscribe(
            data => {
                this.getAllKeys();
            },
            error => console.log(error),
        );
    }

    deleteKey(keyId: string) {

        this.httpService.deleteData('/v1/key/' + keyId).subscribe(
            data => {
                this.getAllKeys();
            },
            error => console.log(error),
        );
    }

}