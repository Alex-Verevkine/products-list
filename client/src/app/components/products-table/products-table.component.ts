import { Component, OnInit, ViewChild } from '@angular/core';
import { IProductVM } from '../../interfaces/IProduct';
import { MatTableDataSource, MatDialog, MatSort, Sort, MatPaginator } from '@angular/material';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { ActivatedRoute, RoutesRecognized, Router } from '@angular/router';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';

@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.scss'],
    })
export class ProductsTableComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private loadingSpinnerService: LoadingSpinnerService
    ) {
        this.loadingSpinnerService.isVisible$$.next(true);
    }

    readonly limit = 5;

    dataSource: MatTableDataSource<IProductVM>;
    DISPLAYED_COLUMNS: string[] = ['name', 'category', 'price', 'creationDate', 'operations'];
    skip = 0;
    filter;
    totalSize;
    sortStrategy;
    currPage = 0;
    @ViewChild(MatSort)
    sort: MatSort;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    ngOnInit() {
        this.router.events.subscribe(val => {
            if (val instanceof RoutesRecognized) {
                if (val.state.root.firstChild.params.hasOwnProperty('page')) {
                    this.productService.count().subscribe((count: number) => {
                        if (isNaN(val.state.root.firstChild.params['page']) || +val.state.root.firstChild.params['page'] > Math.ceil(count / this.limit)) {
                            this.router.navigate(['/Home']);
                        } else {
                            this.currPage = +val.state.root.firstChild.params['page'] - 1;
                            this.skip = this.currPage * this.limit;
                            this.fetchProducts();
                        }
                    });
                } else {
                    this.fetchProducts();
                }
            }
        });
    }

    /**
     * @desc Fetch received products from db.
     */
    private fetchProducts() {
        this.loadingSpinnerService.isVisible$$.next(true);
        Observable.forkJoin(this.productService.get(this.filter, this.sortStrategy, this.skip, this.limit), this.productService.count()).subscribe(
            ([requestedProducts, counts]) => {
                const data = requestedProducts ? <any>requestedProducts : [];
                if (!data.length && this.currPage > 0) {
                    this.skip = --this.currPage * this.limit;
                    this.fetchProducts();
                } else {
                    this.dataSource = new MatTableDataSource(data);
                    this.totalSize = counts;
                    this.loadingSpinnerService.isVisible$$.next(false);
                }
            }
        );
    }

    /**
     * @desc A method that opens edit product modal and saves it to DB on save.
     * @param  {} currProduct Current product object ref.
     */
    onEditProduct(currProduct) {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            width: '250px',
            data: {
                content: {
                    title: 'Edit Product',
                },
                targetObj: Object.assign({}, currProduct),
            },
        });

        dialogRef.afterClosed().subscribe((result: IProductVM) => {
            if (result) {
                this.productService.update(result._id, result).subscribe((updatedProduct: IProductVM) => {
                    this.fetchProducts();
                });
            }
        });
    }

    /**
     * @desc A method that deletes requested product from DB.
     * @param  {} event Element event
     * @param  {} currIndex Current product index.
     * @param  {IProductVM} currProduct Current product ref.
     */
    deleteProduct(event, currIndex: number, currProduct: IProductVM) {
        event.stopPropagation();
        this.productService.delete(currProduct._id).subscribe(res => {
            this.fetchProducts();
        });
    }

    /**
     * @desc A method that opens create new product modal and saves it to DB on save.
     */
    onAddProduct() {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            width: '250px',
            data: {
                content: {
                    title: 'Add Product',
                },
                targetObj: { name: '', category: null, price: '' },
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.productService.create(result).subscribe((createdProduct: IProductVM) => {
                    this.fetchProducts();
                });
            }
        });
    }

    /**
     * @desc A method that get sorted list of products from DB.
     * @param  {Sort} sort Sort object.
     */
    onSortData(sort: Sort) {
        if (sort.active && sort.direction !== '') {
            const sortSign = sort.direction === 'asc' ? '' : '-';
            switch (sort.active) {
                case 'name':
                    this.sortStrategy = `${sortSign}name`;
                    break;
                case 'category':
                    this.sortStrategy = `${sortSign}category`;
                    break;
                case 'price':
                    this.sortStrategy = `${sortSign}price`;
                    break;
                case 'creationDate':
                    this.sortStrategy = `${sortSign}createdAt`;
                    break;
                default:
                    return 0;
            }
            this.fetchProducts();
        }
    }

    /**
     * @desc Triggers filter on current products.
     * @param  {string} filterValue Filter obj.
     */
    applyFilter(filterValue: string) {
        this.filter = filterValue;
        this.fetchProducts();
    }

    /**
     * @desc A method that handles page change.
     * @param  {} event
     */
    handlePage(event) {
        this.currPage = event.pageIndex;
        this.skip = event.pageIndex * this.limit;
        this.fetchProducts();
    }
}
