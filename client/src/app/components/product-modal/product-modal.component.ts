import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IProductVM } from '../../interfaces/IProduct';
import { CATEGORIES } from '../data/select-options';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.scss'],
    })
export class ProductModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ProductModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { content: any; targetObj: IProductVM }) {}

    readonly CATEGORIES = CATEGORIES;

    ngOnInit() {
        this.data.targetObj.category = this.data.targetObj.category || CATEGORIES[0];
    }

    onSave() {
        return this.data.targetObj;
    }

    onClose() {
        this.dialogRef.close();
    }
}
