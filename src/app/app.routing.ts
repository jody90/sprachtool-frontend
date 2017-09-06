import { KEY_ROUTES } from './key/key.routes';
import { VersionsComponent } from './versions/versions.component';
import { KeyComponent } from './key/key.component';
import { RouterModule, Routes } from '@angular/router';


const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/translations',
        pathMatch: 'full'
    },
    {
        path: 'translations',
        component: KeyComponent,
        children: KEY_ROUTES
    },
    {
        path: 'versions',
        component: VersionsComponent
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES)