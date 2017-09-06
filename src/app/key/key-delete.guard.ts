import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

export class KeyDeleteGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return confirm("Bist du sicher dass du diesen Key löschen willst?");
    }
}