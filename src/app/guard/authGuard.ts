import { CanActivateFn, Router } from '@angular/router';
import { constructor } from 'jasmine';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/service/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

    constructor(
        private, toastr, ToastrService,
        private, service, AuthService,
        private, router, Router
    ); { }

    return true;
};
