
import { HttpService } from '../services/http.service';
import { Translation } from './translation.model';
import { KeyModel } from './key.model';
import { LogSerivce } from './../services/log.serivce';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class KeyService {

    constructor(private logSerivce: LogSerivce, private httpService: HttpService) { }

    // private keys: KeyModel[] = [
    //     new KeyModel("jody.test", [new Translation("DE", "Test DE"), new Translation("EN_UK", "Test EN_UK")], new Date().getTime(), new Date().getTime()),
    //     new KeyModel("jody.hey", [new Translation("DE", "Hey DE"), new Translation("EN_UK", "Hey EN_UK"), new Translation("BE_NL", "Hey BE_NL")], new Date().getTime(), new Date().getTime()),
    // ];

    private keys: KeyModel[];

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

        // var key: KeyModel;

        // var backendRequest: boolean = true;

        // if (id == undefined) {
        //     console.log("hier");
        //     backendRequest = false;
        // }
        this.keyEmitter.emit(new KeyModel("", [], new Date().getTime(), new Date().getTime()));

        // let tTranslations = [];
        // if (backendRequest) {

        //     this.httpService.getData("/v1/key/" + id).subscribe(
        //         data => {
        //             for (let i in data.translations) {
        //                 tTranslations.push(new Translation(data.translations[i].language, data.translations[i].value));
        //             }
        //             key = new KeyModel(data.key, tTranslations, data.createdAt, data.modifiedAt);
        //             this.keyEmitter.emit(key);
        //         },
        //         error => {
        //             console.log(error)
        //             throw new Error("No key for ID: " + id + "found");
        //         }
        //     )
        // }
    }

    addKey(key: KeyModel) {

        key.key = key.key.toLowerCase();

        this.keys.push(key);

        this.httpService.sendData('/v1/key/' + key.key, key).subscribe(
            data => console.log(data),
            error => console.log(error),
        );

        // TODO Call Backend
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