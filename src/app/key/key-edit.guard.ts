import { Observable } from 'rxjs/Rx';
import { CanDeactivate } from '@angular/router';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

export class KeyEditGuard implements CanDeactivate {
    canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
        return component.canDeactivate();
    }
}