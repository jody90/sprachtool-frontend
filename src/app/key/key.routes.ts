import { KeyDeleteGuard } from './key-delete.guard';
import { KeyEditComponent } from './key-edit/key-edit.component';
import { KeyDeleteComponent } from './key-delete.component';
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
        path: 'delete/:id',
        component: KeyDeleteComponent,
        canActivate: [KeyDeleteGuard]
    }
]
