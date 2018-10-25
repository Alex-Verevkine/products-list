import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
@Injectable()
export class LoadingSpinnerService {
    isVisible$$ = new ReplaySubject<boolean>(1);
    constructor() {}
}
