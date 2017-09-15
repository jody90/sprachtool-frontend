import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keyFilter',
    pure: false
})
export class KeyFilterPipe implements PipeTransform {
    transform(items: any[], args:string[]): any {

        var language:string = args[0];
        var query:string = args[1];

        if (!items || (!language && !query)) {
            return items;
        }

        var filteredItems = items.filter(function(item, index) {

            if (language && !query) {
                var tTrans = [];

                for (let i in item.translations) {
                    tTrans.push(item.translations[i].language);
                }
                
                if (tTrans.indexOf(language) == -1) {
                    return item;
                }
            }

            if (query && !language) {

                for (let i in item.translations) {
                    var value = item.translations[i].value != null ? item.translations[i].value : [];
                    if (item.key.indexOf(query) !== -1 || value.indexOf(query) !== -1) {
                        return item;
                    }
                }

                if (item.key.indexOf(query) !== -1) {
                    return item
                }
            }

            if (query && language) {
                var tTrans = [];

                for (let i in item.translations) {
                    tTrans.push(item.translations[i].language);
                }

                if (tTrans.indexOf(language) == -1 && item.key.indexOf(query) !== -1) {
                    return item;
                }
            }

        });

        // filter items array, items which match and return true will be kept, false will be filtered out
        return filteredItems;
    }
}