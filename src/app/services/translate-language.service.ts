import { KeyModel } from './../key/key.model';
export class TranslateLanguageService {

    private languages = [
        "DE",
        "EN",
        "DE_EN",
        "EN_UK",
        "BE_NL",
        "BE_FR",
        "FR"
    ];
    
    getAllLanguages(): string [] {       
        return this.languages;
    }

    getLanguagesForKey(key: KeyModel): string [] {

        var languagesCopy = this.languages.slice(0);

        for (let i = 0; i < key.translations.length; i++) {
            let index: number = languagesCopy.indexOf(key.translations[i].language);
            if (index != -1) {
                languagesCopy.splice(index, 1);
            } 
        }

        return languagesCopy;
    }

}