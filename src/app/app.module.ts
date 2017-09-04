import { TranslateLanguageService } from './services/translate-language.service';
import { KeyService } from './key/key.service';
import { LogSerivce } from './services/log.serivce';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { KeyComponent } from './key/key.component';
import { KeyListComponent } from './key/key-list/key-list.component';
import { KeyListItemComponent } from './key/key-list/key-list-item/key-list-item.component';
import { KeyEditComponent } from './key/key-edit/key-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        KeyListComponent,
        KeyListItemComponent,
        KeyEditComponent,
        KeyComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        LogSerivce,
        KeyService,
        TranslateLanguageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
