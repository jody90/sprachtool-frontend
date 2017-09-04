import { Translation } from './translation.model';
import { KeyModel } from './key.model';
import { LogSerivce } from './../services/log.serivce';
import { Injectable } from '@angular/core';

@Injectable()
export class KeyService {

    constructor(private logSerivce: LogSerivce) {

    }

    private keys: KeyModel [] = [
        new KeyModel("jody.test", [new Translation("DE", "Test DE"), new Translation("EN_UK", "Test EN_UK")], new Date().getTime(), new Date().getTime()),
        new KeyModel("jody.hey", [new Translation("DE", "Hey DE"), new Translation("EN_UK", "Hey EN_UK"), new Translation("BE_NL", "Hey BE_NL")], new Date().getTime(), new Date().getTime()),
    ];

    getAllKeys(): KeyModel [] {
        return this.keys;
    }

    getKeyById(id: string): KeyModel {

        let key: KeyModel;

        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i].key == id) {
                key = this.keys[i];
                break;
            }
        }

        if (key != undefined) {
            return key;
        }
        else {
            this.logSerivce.log("getKeyById hat für die ID: " + id + " keinen Eintrag gefunden");
            return null;
        }
    }

}