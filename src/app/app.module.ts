import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { KeyEditGuard } from './key/key-edit.guard';
import { KeyDeleteGuard } from './key/key-delete.guard';
import { KeyFilterPipe } from './key-filter.pipe';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { VersionsComponent } from './versions/versions.component';
import { KeyDeleteComponent } from './key/key-delete.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        KeyListComponent,
        KeyListItemComponent,
        KeyEditComponent,
        KeyComponent,
        VersionsComponent,
        KeyDeleteComponent,
        KeyFilterPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
        // ReactiveFormsModule
    ],
    providers: [
        LogSerivce,
        KeyService,
        TranslateLanguageService,
        KeyDeleteGuard,
        KeyEditGuard,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
