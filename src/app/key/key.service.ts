import { Translation } from './translation.model';
import { KeyModel } from './key.model';
import { LogSerivce } from './../services/log.serivce';
import { Injectable } from '@angular/core';

@Injectable()
export class KeyService {

    constructor(private logSerivce: LogSerivce) {}

    private keys: KeyModel[] = [
        new KeyModel("jody.test", [new Translation("DE", "Test DE"), new Translation("EN_UK", "Test EN_UK")], new Date().getTime(), new Date().getTime()),
        new KeyModel("jody.hey", [new Translation("DE", "Hey DE"), new Translation("EN_UK", "Hey EN_UK"), new Translation("BE_NL", "Hey BE_NL")], new Date().getTime(), new Date().getTime()),
    ];

    getAllKeys(): KeyModel[] {
        
        // TODO Call Backend

        return this.keys;
    }

    getKeyById(id: string): KeyModel {

        // TODO Call Backend

        let key: KeyModel;

        if (id == undefined) {
            return new KeyModel("", [], new Date().getTime(), new Date().getTime());
        }

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
            throw new Error("No key for ID: " + id + "found");
        }
    }

    addKey(key: KeyModel) {

        key.key = key.key.toLowerCase();

        this.keys.push(key);

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