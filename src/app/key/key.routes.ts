import { KeyEditComponent } from './key-edit/key-edit.component';
import { KeyDeleteComponent } from './key-delete/key-delete.component';
import { Routes } from '@angular/router';

export const KEY_ROUTES: Routes = [
    {
        path: 'new',
        component: KeyEditComponent
    },
    {
        path: 'edit',
        redirectTo: ''
    },
    {
        path: 'edit/:id',
        component: KeyEditComponent
    },
    {
        path: 'delete:key',
        component: KeyDeleteComponent
    }
]
