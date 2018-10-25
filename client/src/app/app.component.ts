import { Component } from '@angular/core';
import { LoadingSpinnerService } from './components/loading-spinner/loading-spinner.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    })
export class AppComponent {
    constructor(public loadingSpinnerService: LoadingSpinnerService) {}
}
